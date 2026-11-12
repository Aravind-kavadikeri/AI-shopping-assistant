<?php
// ==========================================================
// AI SHOPPING ASSISTANT - RAZORPAY CONFIGURATION
// Server-Side Secret Management & Gateway Environment
// ==========================================================

require_once __DIR__ . '/../config.php';

// Load from environment or provide secure testing defaults
$razorpayKeyId = getenv('RAZORPAY_KEY_ID') ?: 'rzp_test_shopai_2026';
$razorpayKeySecret = getenv('RAZORPAY_KEY_SECRET') ?: 'secret_test_shopai_2026';
$razorpayWebhookSecret = getenv('RAZORPAY_WEBHOOK_SECRET') ?: 'whsec_shopai_2026';

define('RAZORPAY_KEY_ID', $razorpayKeyId);
define('RAZORPAY_KEY_SECRET', $razorpayKeySecret);
define('RAZORPAY_WEBHOOK_SECRET', $razorpayWebhookSecret);
define('RAZORPAY_CURRENCY', 'INR');
