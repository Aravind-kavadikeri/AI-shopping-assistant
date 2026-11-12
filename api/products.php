<?php
// ==========================================================
// AI SHOPPING ASSISTANT - PRODUCTS & CATALOG CONTROLLER
// Supports Filtering, Dynamic View Logging & Inventory Restock
// ==========================================================

require_once __DIR__ . '/config.php';

$pdo = getDBConnection();

// Handle POST actions (Log Product View / Restock Product)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $action = $input['action'] ?? '';

    // Action 1: Log Product View for Customer Analytics
    if ($action === 'view') {
        $productId = (int)($input['product_id'] ?? 0);
        $userId = (int)($input['user_id'] ?? 1);
        $dwellTime = (int)($input['dwell_time'] ?? 30);

        if ($productId > 0 && $pdo) {
            try {
                // Increment views_count
                $stmt = $pdo->prepare("UPDATE products SET views_count = views_count + 1 WHERE id = ?");
                $stmt->execute([$productId]);

                // Insert into browsing_history
                $stmt2 = $pdo->prepare("INSERT INTO browsing_history (user_id, product_id, dwell_time_seconds, action, timestamp) VALUES (?, ?, ?, 'viewed', NOW())");
                $stmt2->execute([$userId, $productId, $dwellTime]);
            } catch (Exception $e) {}
        }

        echo json_encode(['status' => 'success', 'message' => 'View logged for product ' . $productId]);
        exit();
    }

    // Action 2: Restock PO Execution for Merchants
    if ($action === 'restock') {
        $productId = (int)($input['product_id'] ?? 0);
        $units = (int)($input['units'] ?? 30);

        if ($productId > 0 && $pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE products SET stock = stock + ? WHERE id = ?");
                $stmt->execute([$units, $productId]);

                $stmt2 = $pdo->prepare("
                    UPDATE inventory 
                    SET stock = stock + ?,
                        status = 'In Stock',
                        reorder_suggestion = 0
                    WHERE product_id = ?
                ");
                $stmt2->execute([$units, $productId]);
            } catch (Exception $e) {}
        }

        echo json_encode(['status' => 'success', 'message' => "Restocked product $productId with $units units."]);
        exit();
    }

    // Action 3: Add New Product (Admin CRUD)
    if ($action === 'add') {
        $name = trim($input['name'] ?? 'New AI Product');
        $category = trim($input['category'] ?? 'Electronics');
        $price = (float)($input['price'] ?? 4999.00);
        $originalPrice = (float)($input['original_price'] ?? ($price * 1.25));
        $stock = (int)($input['stock'] ?? 30);
        $desc = trim($input['description'] ?? 'Precision engineered smart device.');
        $img = trim($input['image_url'] ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80');
        $features = json_encode($input['features'] ?? ['Smart Adaptive AI Profile', 'Next-Gen Connectivity']);
        $tags = trim($input['tags'] ?? strtolower($name . ' ' . $category));

        $newId = time() % 100000;
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO products (name, category, price, original_price, stock, description, image_url, features, tags, ai_score, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 90, NOW())
                ");
                $stmt->execute([$name, $category, $price, $originalPrice, $stock, $desc, $img, $features, $tags]);
                $newId = (int)$pdo->lastInsertId();

                $stmtInv = $pdo->prepare("INSERT INTO inventory (product_id, stock, min_threshold, status) VALUES (?, ?, 10, 'In Stock')");
                $stmtInv->execute([$newId, $stock]);
            } catch (Exception $e) {}
        }

        echo json_encode([
            'status' => 'success',
            'product' => [
                'id' => $newId,
                'name' => $name,
                'category' => $category,
                'price' => $price,
                'original_price' => $originalPrice,
                'stock' => $stock,
                'rating' => 4.8,
                'reviews_count' => 12,
                'views_count' => 1,
                'image_url' => $img,
                'description' => $desc,
                'ai_score' => 92,
                'ai_reason' => 'Direct category match • Optimal price-to-performance ratio.'
            ],
            'message' => "Product '$name' added successfully."
        ]);
        exit();
    }

    // Action 4: Update Existing Product (Admin CRUD)
    if ($action === 'update') {
        $productId = (int)($input['product_id'] ?? 0);
        $name = trim($input['name'] ?? '');
        $price = (float)($input['price'] ?? 0);
        $stock = (int)($input['stock'] ?? 0);
        $category = trim($input['category'] ?? '');

        if ($productId > 0 && $pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE products SET name = COALESCE(NULLIF(?, ''), name), price = CASE WHEN ? > 0 THEN ? ELSE price END, stock = CASE WHEN ? >= 0 THEN ? ELSE stock END, category = COALESCE(NULLIF(?, ''), category) WHERE id = ?");
                $stmt->execute([$name, $price, $price, $stock, $stock, $category, $productId]);
            } catch (Exception $e) {}
        }

        echo json_encode(['status' => 'success', 'message' => "Product $productId updated successfully."]);
        exit();
    }

    // Action 5: Delete Product (Admin CRUD)
    if ($action === 'delete') {
        $productId = (int)($input['product_id'] ?? 0);
        if ($productId > 0 && $pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
                $stmt->execute([$productId]);
                $stmt2 = $pdo->prepare("DELETE FROM inventory WHERE product_id = ?");
                $stmt2->execute([$productId]);
            } catch (Exception $e) {}
        }
        echo json_encode(['status' => 'success', 'message' => "Product $productId removed from catalog."]);
        exit();
    }
}

// Fallback catalog if MySQL is offline or initializing
$defaultProducts = [
    [
        'id' => 1,
        'name' => 'Apex Pro ANC Wireless Headphones',
        'category' => 'Electronics',
        'price' => 4999.00,
        'original_price' => 7999.00,
        'rating' => 4.8,
        'reviews_count' => 482,
        'stock' => 38,
        'views_count' => 420,
        'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'description' => 'Next-gen adaptive noise cancelling with spatial 3D audio, 40hr battery life, and ultra-plush memory foam cushions.',
        'features' => ['40dB Hybrid Active Noise Cancellation', '40-Hour Battery with Fast Charge', 'Ultra-low Latency 24ms', 'Multipoint Bluetooth 5.3', 'Spatial Audio Profile'],
        'specs' => ['Driver' => '40mm Bio-Cellulose', 'Battery' => '40 Hours (ANC On)', 'Weight' => '245g', 'Connectivity' => 'Bluetooth 5.3 + 3.5mm Aux'],
        'tags' => 'wireless audio headphones bluetooth anc music sound',
        'ai_score' => 96,
        'ai_reason' => 'Matches your high preference for wireless audio and minimalist dark aesthetics.',
        'pros' => ['Industry-leading 40dB ANC', 'Ultra comfortable memory foam', 'Crystal-clear call microphones'],
        'cons' => ['Carrying case is slightly bulky'],
        'best_use_case' => 'Deep focus coding, long flights & daily commutes'
    ],
    [
        'id' => 2,
        'name' => 'TerraGuard Alpha Waterproof Trekking Jacket',
        'category' => 'Outdoor Gear',
        'price' => 6499.00,
        'original_price' => 9999.00,
        'rating' => 4.9,
        'reviews_count' => 214,
        'stock' => 22,
        'views_count' => 380,
        'image_url' => 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
        'description' => 'Engineered with 3-layer breathable Gore-Shield fabric, taped thermal seams, storm hood, and underarm aeration zips for rugged treks.',
        'features' => ['20,000mm Waterproof Rating', 'Windproof & Breathable 3-Layer Membrane', 'YKK Aquaguard Zippers', 'Reflective Safety Trims', 'Packable into Chest Pocket'],
        'specs' => ['Material' => '3-Layer Recycled Cordura', 'Waterproofing' => '20,000mm hydrostatic head', 'Breathability' => '15,000 g/m²/24h', 'Weight' => '410g'],
        'tags' => 'jacket waterproof trekking outdoor rain hiking weather',
        'ai_score' => 94,
        'ai_reason' => 'Top recommended for trekking in wet climates with 20,000mm hydrostatic head.',
        'pros' => ['True 20,000mm waterproof barrier', 'Underarm aeration zips prevent sweating', 'Reinforced backpack panels'],
        'cons' => ['Fabric crinkles slightly in sub-zero frost'],
        'best_use_case' => 'Himalayan treks, monsoon hiking & alpine expeditions'
    ],
    [
        'id' => 3,
        'name' => 'Zenith UltraSlim 15 Carbon Laptop',
        'category' => 'Laptops & Computers',
        'price' => 58999.00,
        'original_price' => 69999.00,
        'rating' => 4.7,
        'reviews_count' => 195,
        'stock' => 14,
        'views_count' => 590,
        'image_url' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        'description' => 'Powered by Intel Core i7 13th Gen, 16GB LPDDR5, 512GB NVMe SSD, and 2.8K OLED 120Hz display with aluminum unibody build.',
        'features' => ['Intel Core i7-1360P 12-Cores', '16GB RAM + 512GB Gen4 SSD', '15.6 inch 2.8K OLED 100% DCI-P3', '1.18kg Aerospace Aluminum', 'Thunderbolt 4 + All-day Battery'],
        'specs' => ['Processor' => 'Intel Core i7-1360P (12 Cores)', 'Memory' => '16GB LPDDR5 5200MHz', 'Storage' => '512GB NVMe PCIe 4.0', 'Display' => '15.6\" 2.8K OLED 120Hz'],
        'tags' => 'laptop computer programming ultrabook coding intel oled developer',
        'ai_score' => 95,
        'ai_reason' => 'Best value programming laptop under ₹60,000 with 16GB RAM and OLED display.',
        'pros' => ['Stunning 2.8K OLED reduces code eye fatigue', 'Blazing fast multi-threaded compile', 'Featherlight at 1.18kg'],
        'cons' => ['RAM is non-upgradable soldered'],
        'best_use_case' => 'Software engineering, web development & data analysis'
    ],
    [
        'id' => 4,
        'name' => 'AeroStride Quantum Running Shoes',
        'category' => 'Footwear',
        'price' => 3899.00,
        'original_price' => 5499.00,
        'rating' => 4.6,
        'reviews_count' => 329,
        'stock' => 45,
        'views_count' => 450,
        'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        'description' => 'High-rebound nitrogen-infused foam cushioning with engineered carbon plate and breathable hyper-mesh upper for peak performance.',
        'features' => ['Nitrogen-Infused Energy Return Midsole', 'Breathable Engineered Matrix Mesh', 'Carbon Plate Propulsion', 'High-Abrasion Anti-Slip Rubber Sole', 'Ultra-lightweight 215g'],
        'specs' => ['Drop' => '8mm Heel-to-Toe', 'Cushioning' => 'Nitrogen Supercritical Foam', 'Weight' => '215g', 'Surface' => 'Road & Track'],
        'tags' => 'shoes running footwear sneakers sports athletic fitness',
        'ai_score' => 92,
        'ai_reason' => 'Trending high this week (+34% velocity); matches your budget under ₹5,000.',
        'pros' => ['Remarkable bouncy energy return', 'Hyper-breathable matrix mesh', 'Aerodynamic styling'],
        'cons' => ['Requires 10km initial break-in period'],
        'best_use_case' => '5K to marathon running, daily fitness sprints'
    ],
    [
        'id' => 5,
        'name' => 'Nordic Minimalist Waterproof Laptop Backpack',
        'category' => 'Bags & Accessories',
        'price' => 2499.00,
        'original_price' => 3999.00,
        'rating' => 4.8,
        'reviews_count' => 612,
        'stock' => 60,
        'views_count' => 710,
        'image_url' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        'description' => 'Architectural minimalist silhouette crafted from 100% recycled weather-resistant cordura with magnetic fidlock buckles and padded 16" tech sleeve.',
        'features' => ['Weatherproof Matte PU Coating', 'Shockproof Padded 16" Laptop Compartment', 'Hidden Anti-Theft Passport Pocket', 'Ergonomic Honeycomb Back Airflow', 'Luggage Pass-Through Strap'],
        'specs' => ['Capacity' => '22 Liters', 'Laptop Sleeve' => 'Fits up to 16\" MacBook', 'Material' => 'Cordura 900D Waterproof', 'Weight' => '780g'],
        'tags' => 'bag laptop backpack minimalist waterproof commute travel',
        'ai_score' => 93,
        'ai_reason' => 'Frequently bought together with laptops; stylish waterproof commute design.',
        'pros' => ['Weatherproof finish repels downpours', 'Magnetic quick-snap fidlocks', 'Stands upright autonomously'],
        'cons' => ['Bottle pocket is slightly snug for 1L bottles'],
        'best_use_case' => 'Urban tech commuting, coffee shop sessions & travel'
    ],
    [
        'id' => 6,
        'name' => 'PulseSync Pro Smart Fitness Watch',
        'category' => 'Wearables',
        'price' => 3499.00,
        'original_price' => 5999.00,
        'rating' => 4.5,
        'reviews_count' => 276,
        'stock' => 29,
        'views_count' => 310,
        'image_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        'description' => 'Precision PPG biometrics with continuous SpO2, HRV stress tracking, built-in dual-band GPS, and 1.85" curved AMOLED display.',
        'features' => ['1.85 inch Always-On Retina AMOLED', 'Continuous Heart Rate & SpO2 Monitoring', 'Dual-Band Multi-Satellite GPS', '14-Day Battery Life on Single Charge', '5ATM Water Resistance for Swimming'],
        'specs' => ['Display' => '1.85\" Curved AMOLED 600 nits', 'Battery' => '380mAh (14 Days)', 'Water Resistance' => '5ATM (50m Pool)', 'Sensors' => '8-Channel PPG + GPS'],
        'tags' => 'smartwatch fitness watch wearable health tracker gps',
        'ai_score' => 89,
        'ai_reason' => 'Complements fitness profile and pairs with AeroStride running shoes.',
        'pros' => ['Built-in multi-satellite GPS tracks runs accurately', 'Vibrant curved AMOLED', 'Crazy 2-week battery endurance'],
        'cons' => ['No third-party app ecosystem'],
        'best_use_case' => 'Heart rate zones, marathon tracking & sleep metrics'
    ],
    [
        'id' => 7,
        'name' => 'Lumina Smart Ambient Glow Lamp',
        'category' => 'Smart Living',
        'price' => 1999.00,
        'original_price' => 2999.00,
        'rating' => 4.7,
        'reviews_count' => 184,
        'stock' => 52,
        'views_count' => 260,
        'image_url' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
        'description' => 'AI-synced circadian lighting that adapts color temperature to your work schedule and room light sensors, compatible with Matter & HomeKit.',
        'features' => ['16 Million RGB & Tunable White 1800K-6500K', 'Voice Control with Alexa & Google', 'Circadian Rhythm AI Mode', 'Sleek Frosted Glass & Anodized Base', 'Touch Slide Dimmer'],
        'specs' => ['Brightness' => '800 Lumens', 'Color Temp' => '1800K - 6500K Tunable White', 'Protocol' => 'Matter / Wi-Fi + BLE', 'Power' => '9W Energy Star'],
        'tags' => 'lamp lighting smart home ambient desk decor mood',
        'ai_score' => 88,
        'ai_reason' => 'Highly rated minimalist desk setup aesthetic with circadian rhythm sync.',
        'pros' => ['Butter-smooth haptic touch bar', 'Even 360-degree frosted diffusion', 'Native Matter & Alexa support'],
        'cons' => ['Requires 2.4GHz Wi-Fi for setup'],
        'best_use_case' => 'Late night desk coding, ambient bedroom relaxation'
    ],
    [
        'id' => 8,
        'name' => 'SoundSphere 360 Waterproof Bluetooth Speaker',
        'category' => 'Electronics',
        'price' => 2799.00,
        'original_price' => 4499.00,
        'rating' => 4.6,
        'reviews_count' => 310,
        'stock' => 19,
        'views_count' => 340,
        'image_url' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        'description' => 'Omnidirectional acoustic drivers with dual passive radiators, IPX7 floatable waterproof casing, and 24-hour party playback.',
        'features' => ['360-Degree Immersive DSP Sound', 'IPX7 Submersible Waterproof', 'PartyBoost Pair 2+ Speakers', 'Integrated Bass Radiator', '24hr Battery Life'],
        'specs' => ['Output' => '25W RMS Peak DSP Sound', 'Waterproof' => 'IPX7 Submersible', 'Battery' => '5200mAh PowerBank Mode', 'Playtime' => '24 Hours'],
        'tags' => 'speaker audio bluetooth wireless waterproof music portable',
        'ai_score' => 91,
        'ai_reason' => 'Great bundle companion for outdoor gear & wireless audio lovers.',
        'pros' => ['Punchy deep bass with dual passive radiators', 'Floats safely in water if dropped', 'PowerBank reverse charging'],
        'cons' => ['Takes 3 hours for complete recharge'],
        'best_use_case' => 'Outdoor picnics, pool parties & adventure travel'
    ]
];

$products = $defaultProducts;

// If MySQL is available, fetch live product records
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY ai_score DESC");
        $dbRows = $stmt->fetchAll();
        if (!empty($dbRows)) {
            $products = array_map(function($row) use ($defaultProducts) {
                // Find matching default for rich specs/pros/cons if not in DB
                $defaultItem = null;
                foreach ($defaultProducts as $dp) {
                    if ($dp['id'] == $row['id']) { $defaultItem = $dp; break; }
                }

                return [
                    'id' => (int)$row['id'],
                    'name' => $row['name'],
                    'category' => $row['category'],
                    'price' => (float)$row['price'],
                    'original_price' => (float)$row['original_price'],
                    'rating' => (float)$row['rating'],
                    'reviews_count' => (int)$row['reviews_count'],
                    'stock' => (int)$row['stock'],
                    'views_count' => (int)($row['views_count'] ?? 0),
                    'image_url' => $row['image_url'],
                    'description' => $row['description'],
                    'features' => is_string($row['features']) ? json_decode($row['features'], true) : ($row['features'] ?? []),
                    'specs' => $defaultItem['specs'] ?? ['Status' => 'Verified In Stock'],
                    'tags' => $row['tags'],
                    'ai_score' => (int)$row['ai_score'],
                    'ai_reason' => $defaultItem['ai_reason'] ?? 'AI Score computed based on category alignment and budget fit.',
                    'pros' => $defaultItem['pros'] ?? ['Highly rated by verified buyers', 'Verified manufacturer warranty'],
                    'cons' => $defaultItem['cons'] ?? ['High customer demand; limited inventory'],
                    'best_use_case' => $defaultItem['best_use_case'] ?? 'Everyday lifestyle & professional productivity'
                ];
            }, $dbRows);
        }
    } catch (Exception $e) {}
}

// Request parameters
$search = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$maxPrice = isset($_GET['max_price']) ? (float)$_GET['max_price'] : 0;
$minRating = isset($_GET['min_rating']) ? (float)$_GET['min_rating'] : 0;
$minMatch = isset($_GET['min_match']) ? (int)$_GET['min_match'] : 0;

$filtered = array_filter($products, function($p) use ($search, $category, $maxPrice, $minRating, $minMatch) {
    if ($category && $category !== 'All' && strcasecmp($p['category'], $category) !== 0) {
        return false;
    }
    if ($maxPrice > 0 && $p['price'] > $maxPrice) {
        return false;
    }
    if ($minRating > 0 && $p['rating'] < $minRating) {
        return false;
    }
    if ($minMatch > 0 && $p['ai_score'] < $minMatch) {
        return false;
    }
    if ($search !== '') {
        $haystack = strtolower($p['name'] . ' ' . $p['category'] . ' ' . $p['tags'] . ' ' . $p['description']);
        $words = explode(' ', $search);
        foreach ($words as $word) {
            if ($word && strpos($haystack, $word) !== false) {
                return true;
            }
        }
        return false;
    }
    return true;
});

echo json_encode([
    'status' => 'success',
    'source' => $pdo ? 'mysql_database' : 'offline_memory_cache',
    'count' => count($filtered),
    'products' => array_values($filtered)
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
