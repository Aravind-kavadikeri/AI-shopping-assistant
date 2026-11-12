<?php
// ==========================================================
// AI SHOPPING ASSISTANT - CONFIGURATION & DB CONNECTOR
// Compatible with XAMPP (Apache + MySQL) and Live Server
// ==========================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

$reqMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($reqMethod === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials (Configure for Live Hosting or XAMPP Defaults)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'ai_shopping_assistant');

// Environment Mode: 'production' or 'development'
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_NAME', 'ShopAI - AI Shopping Assistant');
define('APP_VERSION', '2.4.0');

/**
 * Returns a PDO database instance if available, or null if running in demo/offline mode
 */
function getDBConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_TIMEOUT            => 2, // fast 2s timeout for graceful fallback
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // If MySQL is not running or DB not created yet, return null for offline fallback
        return null;
    }
}
