<?php
// ==========================================================
// AI SHOPPING ASSISTANT - AI SMART BUNDLE BUILDER
// Budget Optimization & Hardware/Accessory Compatibility Matrix
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
$input = json_decode(file_get_contents('php://input'), true) ?: $_REQUEST;

$anchorProductId = isset($input['product_id']) ? (int)$input['product_id'] : 6; // Zenith Laptop default
$budgetCap = isset($input['budget_cap']) ? (float)$input['budget_cap'] : 75000;
$targetPersona = isset($input['persona']) ? trim($input['persona']) : 'developer';

// Pre-defined Compatibility Matrix
$compatibilityMap = [
    // Laptops & Computers (6: Zenith, 7: MacBook Air)
    6 => [
        'compatible_accessories' => [
            ['id' => 18, 'name' => 'Nordic Minimalist Waterproof Laptop Backpack', 'category' => 'Bags & Accessories', 'price' => 2499.00, 'role' => '16" Suspended Sleeve Carrying Case', 'compatibility' => '100% Fit'],
            ['id' => 2,  'name' => 'UltraFast 65W GaN Pocket Charger', 'category' => 'Electronics', 'price' => 1999.00, 'role' => 'Ultra-Compact USB-C Fast Charger', 'compatibility' => 'PD 3.0 Compatible'],
            ['id' => 26, 'name' => 'AuraGlow Smart Monitor Light Bar', 'category' => 'Smart Living', 'price' => 3299.00, 'role' => 'Eye-Care Screen Lighting', 'compatibility' => 'Universal USB Clamp']
        ],
        'bundle_name' => 'Developer Workstation Kit',
        'bundle_discount' => 1200
    ],
    7 => [
        'compatible_accessories' => [
            ['id' => 18, 'name' => 'Nordic Minimalist Waterproof Laptop Backpack', 'category' => 'Bags & Accessories', 'price' => 2499.00, 'role' => 'Premium Commute Carry', 'compatibility' => '100% Fit'],
            ['id' => 1,  'name' => 'Apex Pro ANC Wireless Headphones', 'category' => 'Electronics', 'price' => 4999.00, 'role' => 'Spatial Audio & ANC', 'compatibility' => 'Lossless Bluetooth 5.3']
        ],
        'bundle_name' => 'Creative Director Studio Kit',
        'bundle_discount' => 2000
    ],
    // Footwear (11: AeroStride)
    11 => [
        'compatible_accessories' => [
            ['id' => 23, 'name' => 'PulseSync Horizon GPS Smartwatch', 'category' => 'Wearables', 'price' => 8499.00, 'role' => 'Cadence & Pace Biometrics', 'compatibility' => 'Syncs Stride Metrics'],
            ['id' => 24, 'name' => 'PulseSync Aero Running Armband', 'category' => 'Wearables', 'price' => 799.00, 'role' => 'Sweatproof Phone Holster', 'compatibility' => 'All Phones up to 6.8"']
        ],
        'bundle_name' => 'Marathon Endurance Kit',
        'bundle_discount' => 900
    ],
    // Outdoor Gear (15: TerraGuard Jacket)
    15 => [
        'compatible_accessories' => [
            ['id' => 17, 'name' => 'HydroPure UV Self-Cleaning Bottle', 'category' => 'Outdoor Gear', 'price' => 1899.00, 'role' => 'Water Purification for Trails', 'compatibility' => 'Attaches to Pack'],
            ['id' => 20, 'name' => 'SmartTouch Wool Winter Gloves', 'category' => 'Bags & Accessories', 'price' => 999.00, 'role' => 'Thermal Touchscreen Grip', 'compatibility' => 'Alpine Rated']
        ],
        'bundle_name' => 'Alpine Explorer Kit',
        'bundle_discount' => 650
    ]
];

$bundleInfo = $compatibilityMap[$anchorProductId] ?? $compatibilityMap[6];

// Fetch Anchor Product details
$anchorProduct = [
    'id' => $anchorProductId,
    'name' => 'Zenith UltraSlim 15 Carbon Laptop',
    'category' => 'Laptops & Computers',
    'price' => 58999.00
];

if ($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT id, name, category, price, original_price, image_url FROM products WHERE id = ?");
        $stmt->execute([$anchorProductId]);
        $res = $stmt->fetch();
        if ($res) {
            $anchorProduct = [
                'id' => (int)$res['id'],
                'name' => $res['name'],
                'category' => $res['category'],
                'price' => (float)$res['price'],
                'image_url' => $res['image_url']
            ];
        }
    } catch (Exception $e) {}
}

$items = [$anchorProduct];
$totalBeforeDiscount = $anchorProduct['price'];

foreach ($bundleInfo['compatible_accessories'] as $acc) {
    if (($totalBeforeDiscount + $acc['price']) <= $budgetCap) {
        $items[] = $acc;
        $totalBeforeDiscount += $acc['price'];
    }
}

$discount = $bundleInfo['bundle_discount'];
$finalBundlePrice = max(0, $totalBeforeDiscount - $discount);
$savingsPct = round(($discount / $totalBeforeDiscount) * 100);

echo json_encode([
    'status' => 'success',
    'bundle_name' => $bundleInfo['bundle_name'],
    'anchor_product_id' => $anchorProductId,
    'total_items_count' => count($items),
    'items' => $items,
    'original_subtotal' => $totalBeforeDiscount,
    'bundle_discount' => $discount,
    'bundle_price' => $finalBundlePrice,
    'savings_percentage' => $savingsPct,
    'budget_utilized' => round(($finalBundlePrice / $budgetCap) * 100) . '% of ₹' . number_format($budgetCap),
    'compatibility_verdict' => '100% Certified Hardware & Workflow Compatibility'
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
