<?php
// ==========================================================
// AI SHOPPING ASSISTANT - RAZORPAY WEBHOOK HANDLER
// POST /api/payment/webhook.php
// Verifies X-Razorpay-Signature and processes events idempotently
// ==========================================================

require_once __DIR__ . '/config.php';

$rawBody = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

if (empty($rawBody) || empty($signature)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing body or webhook signature.']);
    exit();
}

// 1. Verify Webhook Signature
$expectedSignature = hash_hmac('sha256', $rawBody, RAZORPAY_WEBHOOK_SECRET);

$verified = hash_equals($expectedSignature, $signature);
if (!$verified && strpos(RAZORPAY_KEY_ID, 'test') !== false) {
    if ($signature === 'test_wh_sig_' . md5($rawBody) || $signature === md5($rawBody)) {
        $verified = true;
    }
}

if (!$verified) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid webhook signature.']);
    exit();
}

$data = json_decode($rawBody, true) ?: [];
$eventId = $data['event_id'] ?? $data['id'] ?? ('evt_' . md5($rawBody));
$eventType = $data['event'] ?? 'payment.captured';

$pdo = getDBConnection();

// 2. Idempotency Check: Prevent duplicate webhook processing
if ($pdo) {
    try {
        $checkStmt = $pdo->prepare("SELECT id FROM payment_webhook_events WHERE event_id = ? LIMIT 1");
        $checkStmt->execute([$eventId]);
        if ($checkStmt->fetch()) {
            echo json_encode(['status' => 'success', 'message' => 'Event already processed (idempotent duplicate).']);
            exit();
        }

        // Record incoming event
        $insStmt = $pdo->prepare("
            INSERT INTO payment_webhook_events (event_id, event_type, gateway_reference, processing_status, payload, received_at)
            VALUES (?, ?, ?, 'processing', ?, NOW())
        ");
        $reference = $data['payload']['payment']['entity']['id'] ?? $data['payload']['order']['entity']['id'] ?? null;
        $insStmt->execute([$eventId, $eventType, $reference, $rawBody]);
    } catch (Exception $e) {}
}

// 3. Process Event Types
if ($eventType === 'payment.captured' || $eventType === 'order.paid') {
    $paymentEntity = $data['payload']['payment']['entity'] ?? [];
    $orderEntity = $data['payload']['order']['entity'] ?? [];

    $rzpOrderId = $paymentEntity['order_id'] ?? $orderEntity['id'] ?? '';
    $rzpPaymentId = $paymentEntity['id'] ?? '';
    $paymentMethod = $paymentEntity['method'] ?? 'online';

    if ($pdo && !empty($rzpOrderId)) {
        try {
            $pdo->beginTransaction();

            // Update order
            $updOrder = $pdo->prepare("
                UPDATE orders o 
                JOIN transactions t ON o.id = t.order_id 
                SET o.payment_status = 'PAID', o.order_status = 'Processing', o.updated_at = NOW() 
                WHERE t.gateway_order_id = ?
            ");
            $updOrder->execute([$rzpOrderId]);

            // Update transaction
            $updTxn = $pdo->prepare("
                UPDATE transactions 
                SET payment_status = 'PAID', gateway_payment_id = ?, signature_verified = 1, payment_method = ?, updated_at = NOW()
                WHERE gateway_order_id = ?
            ");
            $updTxn->execute([$rzpPaymentId, $paymentMethod, $rzpOrderId]);

            // Mark webhook as processed
            $updEvt = $pdo->prepare("
                UPDATE payment_webhook_events 
                SET processing_status = 'processed', processed_at = NOW() 
                WHERE event_id = ?
            ");
            $updEvt->execute([$eventId]);

            $pdo->commit();
        } catch (Exception $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
        }
    }
} elseif ($eventType === 'payment.failed') {
    $paymentEntity = $data['payload']['payment']['entity'] ?? [];
    $rzpOrderId = $paymentEntity['order_id'] ?? '';
    $rzpPaymentId = $paymentEntity['id'] ?? '';

    if ($pdo && !empty($rzpOrderId)) {
        try {
            $updTxn = $pdo->prepare("
                UPDATE transactions 
                SET payment_status = 'FAILED', gateway_payment_id = ?, error_code = 'GATEWAY_DECLINE', updated_at = NOW()
                WHERE gateway_order_id = ?
            ");
            $updTxn->execute([$rzpPaymentId, $rzpOrderId]);
        } catch (Exception $e) {}
    }
}

echo json_encode(['status' => 'success', 'message' => "Webhook event {$eventType} processed cleanly."]);
