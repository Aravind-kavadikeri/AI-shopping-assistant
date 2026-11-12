<?php
// ==========================================================
// AI SHOPPING ASSISTANT - PERSONALIZED NOTIFICATIONS ENGINE
// Real-time alerts for price drops, stock, bundles & order updates
// ==========================================================

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$pdo = getDBConnection();
$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : (isset($_POST['user_id']) ? (int)$_POST['user_id'] : 1);

// Handle POST: Mark as Read or Clear
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $action = $input['action'] ?? 'mark_read';
    $notifId = isset($input['id']) ? (int)$input['id'] : null;

    if ($pdo) {
        try {
            if ($action === 'mark_read' && $notifId) {
                $upStmt = $pdo->prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?");
                $upStmt->execute([$notifId, $userId]);
            } elseif ($action === 'mark_all_read') {
                $upStmt = $pdo->prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ?");
                $upStmt->execute([$userId]);
            }
        } catch (Exception $e) {}
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Notification status updated.'
    ]);
    exit();
}

// GET: Fetch Active Notifications
$notifications = [];
if ($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 15");
        $stmt->execute([$userId]);
        $notifications = $stmt->fetchAll();
    } catch (Exception $e) {}
}

if (empty($notifications)) {
    $notifications = [
        [
            'id' => 1,
            'type' => 'price_drop',
            'title' => 'Price Drop Alert on Apex Pro ANC',
            'message' => 'Apex Pro ANC Wireless Headphones dropped by ₹300! Now available for ₹4,999.',
            'product_id' => 1,
            'is_read' => 0,
            'created_at' => '10 mins ago'
        ],
        [
            'id' => 2,
            'type' => 'bundle',
            'title' => 'Creator Bundle Unlocked',
            'message' => 'Save ₹800 when purchasing Zenith Carbon Laptop with Nordic Minimalist Backpack.',
            'product_id' => 6,
            'is_read' => 0,
            'created_at' => '2 hours ago'
        ],
        [
            'id' => 3,
            'type' => 'restock',
            'title' => 'Running Footwear Back in Stock',
            'message' => 'AeroStride Quantum running shoes in size UK 8 have been replenished in our regional hub.',
            'product_id' => 11,
            'is_read' => 0,
            'created_at' => '1 day ago'
        ]
    ];
}

$unreadCount = 0;
foreach ($notifications as $n) {
    if (empty($n['is_read'])) $unreadCount++;
}

echo json_encode([
    'status' => 'success',
    'unread_count' => $unreadCount,
    'count' => count($notifications),
    'notifications' => $notifications
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
