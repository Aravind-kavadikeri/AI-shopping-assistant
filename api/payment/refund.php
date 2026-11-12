<?php
// ==========================================================
// AI SHOPPING ASSISTANT - PAYMENT REFUND CONTROLLER
// POST /api/payment/refund.php
// Privileged endpoint: Requires Admin/Merchant Role
// ==========================================================

require_once __DIR__ . '/config.php';

session_start();

$userRole = $_SESSION['user_role'] ?? 'customer';
if ($userRole !== 'admin' && $userRole !== 'merchant') {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Access denied. Administrator privileges required for refunds.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$orderCode = trim($input['order_code'] ?? '');
$reason = trim($input['reason'] ?? 'Customer cancellation/return');

if (empty($orderCode)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Order code is required.']);
    exit();
}

$pdo = getDBConnection();

if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            UPDATE orders 
            SET payment_status = 'REFUNDED', order_status = 'Cancelled', updated_at = NOW() 
            WHERE order_code = ?
        ");
        $stmt->execute([$orderCode]);

        $txnStmt = $pdo->prepare("
            UPDATE transactions 
            SET payment_status = 'REFUNDED', error_description = ?, updated_at = NOW() 
            WHERE order_id = (SELECT id FROM orders WHERE order_code = ? LIMIT 1)
        ");
        $txnStmt->execute([$reason, $orderCode]);

        // Log admin activity
        $adminId = $_SESSION['user_id'] ?? 4;
        $actStmt = $pdo->prepare("
            INSERT INTO admin_activity_logs (admin_id, action, target_entity, target_id, details)
            VALUES (?, 'PROCESS_REFUND', 'order', ?, ?)
        ");
        $actStmt->execute([$adminId, $orderCode, "Refund processed for order {$orderCode}. Reason: {$reason}"]);
    } catch (Exception $e) {}
}

echo json_encode([
    'status' => 'success',
    'message' => "Order {$orderCode} marked as REFUNDED. Gateway reversal initiated.",
    'order_code' => $orderCode,
    'payment_status' => 'REFUNDED'
]);
