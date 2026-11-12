<?php
// ==========================================================
// AI SHOPPING ASSISTANT - EMBEDDED IoT SMART SHELF CONTROLLER
// Handles Real ESP32 HTTP POST & Telemetry Retrieval
// ==========================================================

require_once __DIR__ . '/config.php';

$cacheFile = __DIR__ . '/sensor_cache.json';
$pdo = getDBConnection();

// POST: Receiving Sensor Telemetry (from ESP32 Hardware or Simulation)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    $deviceId = htmlspecialchars($input['device_id'] ?? 'ESP32-SHELF-01');
    $shelfZone = htmlspecialchars($input['shelf_zone'] ?? 'Aisle 3 - Tech & Audio');
    $temperature = (float)($input['temperature'] ?? 24.6);
    $humidity = (float)($input['humidity'] ?? 54.0);
    $stockLevel = (int)($input['stock_level'] ?? 82);
    $productCount = (int)($input['product_count'] ?? 41);
    $isSimulated = isset($input['is_simulated']) ? (int)$input['is_simulated'] : 0;
    $status = ($stockLevel < 20) ? 'Warning' : 'Online';

    $record = [
        'device_id' => $deviceId,
        'shelf_zone' => $shelfZone,
        'temperature' => $temperature,
        'humidity' => $humidity,
        'stock_level' => $stockLevel,
        'product_count' => $productCount,
        'is_simulated' => $isSimulated,
        'status' => $status,
        'timestamp' => date('Y-m-d H:i:s'),
        'data_source' => $isSimulated ? 'SIMULATION MODE' : 'LIVE DEVICE DATA'
    ];

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO sensor_data (device_id, shelf_zone, temperature, humidity, stock_level, product_count, is_simulated, status, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ");
            $stmt->execute([$deviceId, $shelfZone, $temperature, $humidity, $stockLevel, $productCount, $isSimulated, $status]);
        } catch (Exception $e) {}
    }

    // Always cache the latest telemetry packet
    @file_put_contents($cacheFile, json_encode($record, JSON_PRETTY_PRINT));

    echo json_encode([
        'status' => 'success',
        'message' => 'Telemetry acknowledged from ' . $deviceId,
        'telemetry' => $record
    ]);
    exit();
}

// GET: Returning Latest Telemetry to the Dashboard
$latest = [
    'device_id' => 'ESP32-SHELF-01',
    'shelf_zone' => 'Aisle 3 - Tech & Audio',
    'temperature' => 24.6,
    'humidity' => 54.2,
    'stock_level' => 82,
    'product_count' => 41,
    'status' => 'Online',
    'timestamp' => date('Y-m-d H:i:s'),
    'last_sync' => 'Active stream (2s ago)',
    'data_mode' => 'SIMULATION MODE',
    'is_hardware_connected' => false,
    'devices' => [
        [
            'id' => 'ESP32-SHELF-01',
            'name' => 'Smart Shelf 01 (Audio & Headphones)',
            'stock_level' => 82,
            'count' => 41,
            'temp' => 24.6,
            'status' => 'Online',
            'mode' => 'SIMULATION MODE'
        ],
        [
            'id' => 'ESP32-SHELF-02',
            'name' => 'Smart Shelf 02 (Running Footwear)',
            'stock_level' => 45,
            'count' => 18,
            'temp' => 25.1,
            'status' => 'Online',
            'mode' => 'SIMULATION MODE'
        ],
        [
            'id' => 'ESP32-SHELF-03',
            'name' => 'Smart Shelf 03 (Trekking & Outerwear)',
            'stock_level' => 22,
            'count' => 8,
            'temp' => 23.8,
            'status' => 'Warning',
            'mode' => 'SIMULATION MODE'
        ]
    ]
];

if ($pdo) {
    try {
        $stmt = $pdo->query("
            SELECT * FROM sensor_data 
            ORDER BY timestamp DESC 
            LIMIT 1
        ");
        $row = $stmt->fetch();
        if ($row) {
            $isSim = (int)$row['is_simulated'];
            $timeDiff = time() - strtotime($row['timestamp']);

            $latest['device_id'] = $row['device_id'];
            $latest['shelf_zone'] = $row['shelf_zone'];
            $latest['temperature'] = (float)$row['temperature'];
            $latest['humidity'] = (float)$row['humidity'];
            $latest['stock_level'] = (int)$row['stock_level'];
            $latest['product_count'] = (int)$row['product_count'];
            $latest['status'] = $row['status'];
            $latest['timestamp'] = $row['timestamp'];
            $latest['last_sync'] = ($timeDiff < 5) ? 'Just now' : "$timeDiff seconds ago";

            if ($isSim === 0 && $timeDiff < 60) {
                $latest['data_mode'] = 'LIVE DEVICE DATA';
                $latest['is_hardware_connected'] = true;
            } else {
                $latest['data_mode'] = 'SIMULATION MODE';
                $latest['is_hardware_connected'] = false;
            }
        }
    } catch (Exception $e) {}
} elseif (file_exists($cacheFile)) {
    $cached = json_decode(file_get_contents($cacheFile), true);
    if ($cached) {
        $latest['device_id'] = $cached['device_id'];
        $latest['temperature'] = $cached['temperature'];
        $latest['humidity'] = $cached['humidity'];
        $latest['stock_level'] = $cached['stock_level'];
        $latest['product_count'] = $cached['product_count'];
        $latest['status'] = $cached['status'];
        $latest['data_mode'] = $cached['data_source'] ?? 'SIMULATION MODE';
    }
}

echo json_encode([
    'status' => 'success',
    'telemetry' => $latest
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
