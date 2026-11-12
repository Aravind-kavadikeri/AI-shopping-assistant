<?php
// ==========================================================
// AI SHOPPING ASSISTANT - VISUAL SEARCH ANALYSE CONTROLLER
// POST /api/visual-search/analyse.php
// Analyzes uploaded image, extracts visual attributes & features
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
$fileData = $_FILES['image'] ?? ($input['image'] ?? ($input['image_base64'] ?? null));
$language = trim($input['language'] ?? ($_SESSION['preferred_language'] ?? 'en'));

if (!$fileData) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'No image provided. Please select or capture an image to search.'
    ]);
    exit();
}

// Validate & Save image upload
$uploadRes = validateAndSaveUpload($fileData);
if (!$uploadRes['success']) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $uploadRes['error']
    ]);
    exit();
}

// Analyze image attributes
$textPrompt = trim($input['prompt'] ?? '');
$analysis = VisualEmbeddingEngine::analyzeImage($uploadRes['filepath'], $textPrompt, $language);

echo json_encode([
    'status' => 'success',
    'message' => 'Image analyzed successfully.',
    'image_url' => $uploadRes['relative_url'],
    'image_meta' => [
        'width' => $uploadRes['width'],
        'height' => $uploadRes['height'],
        'mime' => $uploadRes['mime'],
        'size_bytes' => $uploadRes['size_bytes']
    ],
    'analysis' => [
        'category' => $analysis['classification']['category'],
        'product_type' => $analysis['classification']['product_type'],
        'dominant_colors' => $analysis['dominant_colors'],
        'color_hex' => $analysis['color_hex'],
        'material' => $analysis['classification']['material'],
        'style' => $analysis['classification']['style'],
        'features' => $analysis['classification']['features'],
        'use_case' => $analysis['classification']['use_case'],
        'aspect_ratio' => $analysis['aspect_ratio']
    ]
]);
