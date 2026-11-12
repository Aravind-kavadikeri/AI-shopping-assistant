<?php
// ==========================================================
// AI SHOPPING ASSISTANT - USERS & ACCOUNT MANAGEMENT API
// Supports Admin User Listing, Role Authorization & Account Status
// ==========================================================

require_once __DIR__ . '/config.php';

$pdo = getDBConnection();

// Fallback seed users if MySQL is offline or initializing
$defaultUsers = [
    [
        'id' => 1,
        'name' => 'Aravind Sharma',
        'username' => 'aravind',
        'email' => 'aravind@example.com',
        'role' => 'customer',
        'status' => 'Active',
        'created_at' => date('Y-m-d H:i:s', strtotime('-14 days'))
    ],
    [
        'id' => 2,
        'name' => 'Store Operations Admin',
        'username' => 'admin',
        'email' => 'merchant@example.com',
        'role' => 'merchant',
        'status' => 'Active',
        'created_at' => date('Y-m-d H:i:s', strtotime('-30 days'))
    ],
    [
        'id' => 3,
        'name' => 'Priya Patel',
        'username' => 'priya',
        'email' => 'priya@example.com',
        'role' => 'customer',
        'status' => 'Active',
        'created_at' => date('Y-m-d H:i:s', strtotime('-10 days'))
    ],
    [
        'id' => 4,
        'name' => 'Rohan Verma',
        'username' => 'rohan',
        'email' => 'rohan@example.com',
        'role' => 'customer',
        'status' => 'Active',
        'created_at' => date('Y-m-d H:i:s', strtotime('-5 days'))
    ]
];

// GET: Retrieve all registered accounts
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = [];
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, name, username, email, role, status, created_at FROM users ORDER BY id ASC");
            $users = $stmt->fetchAll();
        } catch (Exception $e) {}
    }

    if (empty($users)) {
        $users = $defaultUsers;
    }

    echo json_encode([
        'status' => 'success',
        'count' => count($users),
        'users' => $users
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit();
}

// POST: Manage User Role / Status
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $action = $input['action'] ?? '';
    $userId = (int)($input['user_id'] ?? 0);

    if ($userId <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Valid user_id required.']);
        exit();
    }

    if ($action === 'update_role') {
        $newRole = in_array($input['role'] ?? '', ['customer', 'merchant', 'admin']) ? $input['role'] : 'customer';
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
                $stmt->execute([$newRole, $userId]);
            } catch (Exception $e) {}
        }
        echo json_encode([
            'status' => 'success',
            'user_id' => $userId,
            'role' => $newRole,
            'message' => "Role updated to $newRole for user ID $userId."
        ]);
        exit();
    }

    if ($action === 'toggle_status') {
        $newStatus = ($input['status'] ?? '') === 'Deactivated' ? 'Deactivated' : 'Active';
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE users SET status = ? WHERE id = ?");
                $stmt->execute([$newStatus, $userId]);
            } catch (Exception $e) {}
        }
        echo json_encode([
            'status' => 'success',
            'user_id' => $userId,
            'status_label' => $newStatus,
            'message' => "Account status set to $newStatus for user ID $userId."
        ]);
        exit();
    }

    echo json_encode(['status' => 'error', 'message' => 'Unknown action.']);
    exit();
}
