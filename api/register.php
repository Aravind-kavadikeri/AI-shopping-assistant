<?php
// ==========================================================
// AI SHOPPING ASSISTANT - USER REGISTRATION CONTROLLER
// Validates, Hashes Password with Bcrypt & Restricts Role Assignment
// ==========================================================

require_once __DIR__ . '/config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name = trim($input['name'] ?? '');
$username = strtolower(trim($input['username'] ?? ''));
$email = strtolower(trim($input['email'] ?? ''));
$phone = trim($input['phone'] ?? '');
$preferredLanguage = trim($input['preferred_language'] ?? 'en');
$password = trim($input['password'] ?? '');
$confirmPassword = trim($input['confirm_password'] ?? '');

// Server-side validation
if (empty($name) || empty($username) || empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit();
}

if (strlen($username) < 3) {
    echo json_encode(['status' => 'error', 'message' => 'Username must be at least 3 characters.']);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 6 characters.']);
    exit();
}

if ($confirmPassword !== '' && $password !== $confirmPassword) {
    echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
    exit();
}

// Security: Public registration always assigns 'customer' role
$role = 'customer';
$passwordHash = password_hash($password, PASSWORD_BCRYPT);
$defaultPrefs = json_encode([
    'preferred_categories' => ['Electronics', 'Footwear'],
    'budget_cap' => 50000,
    'style' => 'Modern Minimalist'
]);

$pdo = getDBConnection();
$userId = time();

if ($pdo) {
    try {
        // Check uniqueness
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1");
        $checkStmt->execute([$email, $username]);
        if ($checkStmt->fetch()) {
            echo json_encode(['status' => 'error', 'message' => 'An account with this email or username already exists.']);
            exit();
        }

        // Insert new user
        $insertStmt = $pdo->prepare("
            INSERT INTO users (name, username, email, phone, preferred_language, password_hash, role, preferences, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        $insertStmt->execute([$name, $username, $email, $phone, $preferredLanguage, $passwordHash, $role, $defaultPrefs]);
        $userId = (int)$pdo->lastInsertId();
    } catch (Exception $e) {
        // Graceful fallback for offline mode
    }
}

// Log in automatically after registration
session_regenerate_id(true);
$_SESSION['user_id'] = $userId;
$_SESSION['user_role'] = $role;
$_SESSION['user_name'] = $name;
$_SESSION['user_email'] = $email;

echo json_encode([
    'status' => 'success',
    'message' => 'Registration successful! Welcome to ShopAI, ' . $name,
    'user' => [
        'id' => $userId,
        'name' => $name,
        'username' => $username,
        'email' => $email,
        'phone' => $phone,
        'preferred_language' => $preferredLanguage,
        'role' => $role,
        'preferences' => json_decode($defaultPrefs, true)
    ]
]);
