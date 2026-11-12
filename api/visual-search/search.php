<?php
// ==========================================================
// AI SHOPPING ASSISTANT - VISUAL SIMILARITY SEARCH API
// POST /api/visual-search/search.php
// Returns ranked catalog matches using genuine cosine vector similarity
// ==========================================================

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/embedding_engine.php';

session_start();
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$userId = $_SESSION['user_id'] ?? (int)($input['user_id'] ?? 1);
$fileData = $_FILES['image'] ?? ($input['image'] ?? ($input['image_base64'] ?? null));
$imagePathInput = trim($input['image_url'] ?? ($input['image_path'] ?? ''));
$textPrompt = trim($input['prompt'] ?? '');
$language = trim($input['language'] ?? ($_SESSION['preferred_language'] ?? 'en'));

$uploadRes = null;

if ($fileData) {
    $uploadRes = validateAndSaveUpload($fileData);
    if (!$uploadRes['success']) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => $uploadRes['error']]);
        exit();
    }
} elseif (!empty($imagePathInput)) {
    // Reference existing uploaded image
    $absPath = realpath(__DIR__ . '/../../' . ltrim($imagePathInput, '/'));
    if ($absPath && file_exists($absPath) && strpos($absPath, realpath(VS_UPLOAD_DIR)) === 0) {
        $imgSize = @getimagesize($absPath);
        $uploadRes = [
            'success' => true,
            'filepath' => $absPath,
            'relative_url' => $imagePathInput,
            'width' => $imgSize ? $imgSize[0] : 400,
            'height' => $imgSize ? $imgSize[1] : 400,
            'size_bytes' => filesize($absPath)
        ];
    }
}

if (!$uploadRes || !$uploadRes['success']) {
    // If no image uploaded, check if query prompt alone is provided
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide an image to search visually.'
    ]);
    exit();
}

// 1. Analyze query image
$analysis = VisualEmbeddingEngine::analyzeImage($uploadRes['filepath'], $textPrompt, $language);

// 2. Search catalog by cosine similarity & combined prompt
$filters = [
    'category' => $input['category'] ?? null,
    'max_price' => $input['max_price'] ?? null,
    'sort_by' => $input['sort_by'] ?? 'similarity',
    'min_similarity' => $input['min_similarity'] ?? 55.0
];

$matches = VisualEmbeddingEngine::searchSimilarProducts($analysis, $textPrompt, $filters);

// 3. Save to search history in MySQL if available
$pdo = getDBConnection();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO visual_search_history (user_id, image_path, detected_category, detected_type, dominant_color, visual_features, combined_prompt, matched_product_ids, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        $matchedIds = json_encode(array_slice(array_column($matches, 'id'), 0, 5));
        $featJson = json_encode($analysis['classification']);
        $domCol = $analysis['dominant_colors'][0]['name'] ?? 'Monochrome';
        $stmt->execute([$userId, $uploadRes['relative_url'], $analysis['classification']['category'], $analysis['classification']['product_type'], $domCol, $featJson, $textPrompt, $matchedIds]);
    } catch (Exception $e) {
        // Table created on demand or ignore
    }
}

echo json_encode([
    'status' => 'success',
    'query_image' => $uploadRes['relative_url'],
    'image_meta' => [
        'width' => $uploadRes['width'],
        'height' => $uploadRes['height'],
        'size_bytes' => $uploadRes['size_bytes']
    ],
    'combined_prompt' => $textPrompt,
    'language' => $language,
    'identified_attributes' => [
        'category' => $analysis['classification']['category'],
        'product_type' => $analysis['classification']['product_type'],
        'dominant_colors' => $analysis['dominant_colors'],
        'color_hex' => $analysis['color_hex'],
        'material' => $analysis['classification']['material'],
        'style' => $analysis['classification']['style'],
        'features' => $analysis['classification']['features'],
        'use_case' => $analysis['classification']['use_case'],
        'aspect_ratio' => $analysis['aspect_ratio']
    ],
    'results_count' => count($matches),
    'results' => array_slice($matches, 0, 12)
]);
