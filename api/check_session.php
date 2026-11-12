<?php
// ==========================================================
// AI SHOPPING ASSISTANT - SESSION VALIDATION CONTROLLER
// Checks Active Login State & Returns Current User Role
// ==========================================================

require_once __DIR__ . '/config.php';

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'success',
        'logged_in' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'role' => $_SESSION['user_role'] ?? 'customer',
            'name' => $_SESSION['user_name'] ?? 'User',
            'email' => $_SESSION['user_email'] ?? ''
        ]
    ]);
} else {
    echo json_encode([
        'status' => 'success',
        'logged_in' => false
    ]);
}
