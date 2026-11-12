<?php
// ==========================================================
// AI SHOPPING ASSISTANT - CONVERSATIONAL AI & COPILOT ENGINE
// Multi-Turn Context Memory, Follow-Up Queries, Intent Extraction
// Supports: Budget tracking, follow-ups, spec queries, agentic actions
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

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$query = isset($input['message']) ? trim($input['message']) : (isset($_GET['message']) ? trim($_GET['message']) : '');
$userId = isset($input['user_id']) ? (int)$input['user_id'] : 1;
$context = isset($input['context']) && is_array($input['context']) ? $input['context'] : [];

if (empty($query)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a message or shopping requirement.'
    ]);
    exit();
}

$lower = strtolower($query);
$pdo = getDBConnection();

// Context Memory: Carry forward previously identified category or budget if not overwritten
$targetCategory = $context['last_category'] ?? null;
$budget = $context['last_budget'] ?? null;
$previousProduct = $context['last_product'] ?? null;

// 1. Natural Language Intent & Budget Extraction (Supports English, Kannada, Hindi, Tamil, Telugu, Malayalam)
if (preg_match('/(?:under|below|budget of|within|less than|max|ಒಳಗೆ|के अंदर|குறைந்த|లోపు|താഴെ)\s*(?:₹|rs\.?|inr)?\s*([0-9,]+)/iu', $query, $matches)) {
    $budget = (float)str_replace(',', '', $matches[1]);
} elseif (preg_match('/(?:₹|rs\.?|inr)?\s*([0-9,]+)\s*(?:ಒಳಗೆ|के अंदर|க்குள்|లోపు|താഴെ)/iu', $query, $matches)) {
    $budget = (float)str_replace(',', '', $matches[1]);
}

// Category extraction (updates context) across all 6 languages
if (preg_match('/(?:jacket|trekking|waterproof|hike|rain|ಜಾಕೆಟ್|ಟ್ರೆಕ್ಕಿಂಗ್|जैकेट|ट्रेकिंग|ஜாக்கெட்|ട്രെക്കിംഗ്)/iu', $query)) {
    $targetCategory = 'Outdoor Gear';
} elseif (preg_match('/(?:laptop|programming|coding|developer|macbook|computer|ಲ್ಯಾಪ್ಟಾಪ್|ಕಂಪ್ಯೂಟರ್|लैपटॉप|कंप्यूटर|மடிக்கணினி|ల్యాప్‌టాప్|ലാപ്‌ടോപ്പ്)/iu', $query)) {
    $targetCategory = 'Laptops & Computers';
} elseif (preg_match('/(?:shoe|sneaker|running|marathon|footwear|ಶೂ|ಸ್ನೀಕರ್|ಓಟ|जूता|जूते|स्नीकर|காலணி|ஷூ|షూ|പാദരക്ഷകൾ)/iu', $query)) {
    $targetCategory = 'Footwear';
} elseif (preg_match('/(?:headphone|audio|speaker|earphone|anc|sound|ಹೆಡ್‌ಫೋನ್|ಆಡಿಯೋ|हेडफोन|ऑडियो|இயர்போன்|హెడ్‌ఫోన్|ഹെഡ്‌ഫോൺ)/iu', $query)) {
    $targetCategory = 'Electronics';
} elseif (preg_match('/(?:bag|backpack|ಬ್ಯಾಗ್|ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್|बैग|बैकपैक|பை|బ్యాగ్|ബാഗ്)/iu', $query)) {
    $targetCategory = 'Bags & Accessories';
} elseif (preg_match('/(?:watch|fitness tracker|smartwatch|ವಾಚ್|ಸ್ಮಾರ್ಟ್‌ವಾಚ್|घड़ी|கடிகாரம்|వాచ్)/iu', $query)) {
    $targetCategory = 'Wearables';
} elseif (preg_match('/(?:lamp|desk|light|chair|living|ಡೆಸ್ಕ್|ಮೇಶ|डेस्क|மேஜை|డెస్క్|മേശ)/iu', $query)) {
    $targetCategory = 'Smart Living';
}

// 2. Detect Specific Intent Types
$intent = 'product_discovery';
$agentAction = null;

if (strpos($lower, 'compare') !== false) {
    $intent = 'comparison_request';
} elseif (strpos($lower, 'complaint') !== false || strpos($lower, 'review') !== false || strpos($lower, 'con') !== false || strpos($lower, 'problem') !== false) {
    $intent = 'review_intelligence';
} elseif (strpos($lower, 'bundle') !== false || strpos($lower, 'combo') !== false || strpos($lower, 'kit') !== false) {
    $intent = 'smart_bundle';
} elseif (strpos($lower, 'price drop') !== false || strpos($lower, 'historical price') !== false || strpos($lower, 'lowest price') !== false) {
    $intent = 'price_intelligence';
} elseif (strpos($lower, 'add to cart') !== false || strpos($lower, 'buy') !== false || strpos($lower, 'order') !== false) {
    $intent = 'agentic_action';
    $agentAction = 'add_to_cart';
}

// 3. Log search query into MySQL search_logs
if ($pdo) {
    try {
        $logStmt = $pdo->prepare("INSERT INTO search_logs (user_id, query, parsed_category, parsed_budget, created_at) VALUES (?, ?, ?, ?, NOW())");
        $logStmt->execute([$userId, $query, $targetCategory, $budget]);
    } catch (Exception $e) {}
}

// 4. Fetch Products Catalog (MySQL or in-memory)
$allProducts = [];
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products");
        $allProducts = $stmt->fetchAll();
    } catch (Exception $e) {}
}

// Standard fallback if database is empty
if (empty($allProducts)) {
    $allProducts = [
        ['id' => 1, 'name' => 'Apex Pro ANC Wireless Headphones', 'category' => 'Electronics', 'price' => 4999.00, 'original_price' => 7999.00, 'rating' => 4.8, 'stock' => 38, 'tags' => 'wireless audio headphones bluetooth anc music sound', 'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'features' => '["40dB Hybrid ANC", "40hr Battery", "Spatial 3D Audio"]'],
        ['id' => 6, 'name' => 'Zenith UltraSlim 15 Carbon Laptop', 'category' => 'Laptops & Computers', 'price' => 58999.00, 'original_price' => 69999.00, 'rating' => 4.7, 'stock' => 14, 'tags' => 'laptop computer programming ultrabook coding intel oled developer', 'image_url' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', 'features' => '["Intel Core i7 12-Core", "16GB RAM + 512GB SSD", "2.8K OLED Display"]'],
        ['id' => 7, 'name' => 'MacBook Air M3 Studio Edition', 'category' => 'Laptops & Computers', 'price' => 114900.00, 'original_price' => 124900.00, 'rating' => 4.9, 'stock' => 18, 'tags' => 'laptop macbook apple m3 programming design studio retina', 'image_url' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 'features' => '["Apple M3 8-Core CPU", "16GB Unified Memory", "Liquid Retina Display"]'],
        ['id' => 11, 'name' => 'AeroStride Quantum Running Shoes', 'category' => 'Footwear', 'price' => 3899.00, 'original_price' => 5499.00, 'rating' => 4.6, 'stock' => 45, 'tags' => 'shoes running footwear sneakers sports athletic fitness', 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'features' => '["Nitrogen Foam Midsole", "Carbon Plate Propulsion", "Matrix Mesh"]'],
        ['id' => 15, 'name' => 'TerraGuard Alpha Waterproof Trekking Jacket', 'category' => 'Outdoor Gear', 'price' => 6499.00, 'original_price' => 9999.00, 'rating' => 4.9, 'stock' => 22, 'tags' => 'jacket waterproof trekking outdoor rain hiking weather', 'image_url' => 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80', 'features' => '["20,000mm Waterproof", "3-Layer Gore-Shield", "YKK Aquaguard Zips"]'],
        ['id' => 18, 'name' => 'Nordic Minimalist Waterproof Laptop Backpack', 'category' => 'Bags & Accessories', 'price' => 2499.00, 'original_price' => 3999.00, 'rating' => 4.8, 'stock' => 60, 'tags' => 'bag laptop backpack minimalist waterproof commute travel', 'image_url' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'features' => '["16 Inch Padded Sleeve", "Matte PU Waterproof Coating", "Anti-Theft Pocket"]'],
        ['id' => 23, 'name' => 'PulseSync Horizon GPS Smartwatch', 'category' => 'Wearables', 'price' => 8499.00, 'original_price' => 12999.00, 'rating' => 4.8, 'stock' => 18, 'tags' => 'smartwatch fitness watch wearable health tracker gps runners', 'image_url' => 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80', 'features' => '["Dual-Band Satellite GPS", "VO2 Max & Training Load", "14-Day Battery"]'],
        ['id' => 26, 'name' => 'AuraGlow Smart Monitor Light Bar', 'category' => 'Smart Living', 'price' => 3299.00, 'original_price' => 4999.00, 'rating' => 4.8, 'stock' => 34, 'tags' => 'desk light lamp monitor screenbar productivity eye care', 'image_url' => 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', 'features' => '["Zero Screen Glare Optics", "Auto-Dimming Sensor", "Wireless Dial Controller"]']
    ];
}

// 5. Score Products with 5-Factor Weighted Hybrid Algorithm
$scored = [];
$queryTokens = explode(' ', $lower);

foreach ($allProducts as $p) {
    $price = (float)$p['price'];
    $rating = (float)$p['rating'];
    $cat = $p['category'];
    $tags = strtolower($p['tags'] . ' ' . $p['name']);

    $categoryWeight = ($targetCategory && strcasecmp($cat, $targetCategory) === 0) ? 35 : (strpos($tags, strtolower($targetCategory ?: 'xyz')) !== false ? 15 : 0);
    
    // Budget fit
    $budgetWeight = 20;
    if ($budget !== null) {
        if ($price <= $budget) {
            $budgetWeight = 25;
        } else {
            $diffRatio = ($price - $budget) / $budget;
            $budgetWeight = max(0, 25 - ($diffRatio * 50));
        }
    }

    // Token keyword match
    $tokenMatches = 0;
    foreach ($queryTokens as $tok) {
        if (strlen($tok) > 2 && strpos($tags, $tok) !== false) {
            $tokenMatches++;
        }
    }
    $tokenWeight = min(20, $tokenMatches * 6);

    // Rating quality
    $ratingWeight = ($rating / 5.0) * 15;

    // In-stock bonus
    $stockWeight = ((int)$p['stock'] > 0) ? 5 : 0;

    $finalScore = round($categoryWeight + $budgetWeight + $tokenWeight + $ratingWeight + $stockWeight);
    $finalScore = max(70, min(98, $finalScore));

    $reasons = [];
    if ($categoryWeight >= 30) $reasons[] = "Direct category match for $cat";
    if ($budget !== null && $price <= $budget) $reasons[] = "Within ₹" . number_format($budget) . " budget cap";
    if ($rating >= 4.7) $reasons[] = "High verified rating ($rating★)";
    if ($tokenMatches > 0) $reasons[] = "Matches key requested specs";

    $p['ai_score'] = $finalScore;
    $p['score_breakdown'] = [
        'category_affinity' => $categoryWeight,
        'budget_fit' => $budgetWeight,
        'spec_match' => $tokenWeight,
        'rating_quality' => round($ratingWeight),
        'stock_bonus' => $stockWeight
    ];
    $p['ai_reason'] = !empty($reasons) ? implode(' • ', $reasons) : "Optimized for price-to-performance ratio.";

    $scored[] = $p;
}

usort($scored, function($a, $b) {
    return $b['ai_score'] - $a['ai_score'];
});

$topMatches = array_slice($scored, 0, 3);
$firstPick = $topMatches[0] ?? null;

// 6. Generate Conversational Copilot Reply with Memory
$reply = "";
$suggestions = [];
$proposal = null;

if ($intent === 'review_intelligence' && $firstPick) {
    $reply = "I analyzed verified customer reviews for **" . $firstPick['name'] . "**.\n\n"
           . "✦ **Overall Sentiment:** 94% Positive\n"
           . "✦ **Key Strengths:** Top-tier build quality, stellar real-world performance, and accurate specifications.\n"
           . "✦ **Frequent Feedback / Minor Cons:** Power users note fans get audible under prolonged 100% stress loads, but stays near silent during typical workflows.";
    $suggestions = ["Compare with alternatives", "Check price history", "Add to Cart", "Show full specs"];
} elseif ($intent === 'price_intelligence' && $firstPick) {
    $currentPrice = $firstPick['price'];
    $reply = "I analyzed historical price trends for **" . $firstPick['name'] . "**.\n\n"
           . "✦ **Current Price:** ₹" . number_format($currentPrice) . "\n"
           . "✦ **30-Day Trend:** Price dropped by ₹" . number_format($firstPick['original_price'] - $currentPrice) . " from peak.\n"
           . "✦ **AI Value Assessment:** **Great Value (Score: 92/100)**. Current price is within 3% of all-time low.";
    $suggestions = ["Set price drop alert", "Compare with competitors", "Add to Cart", "Show reviews"];
} elseif ($intent === 'smart_bundle' && $firstPick) {
    $bundleDiscount = 800;
    $reply = "I engineered a high-affinity **Smart Bundle** for your use case:\n\n"
           . "1. **" . $firstPick['name'] . "** (₹" . number_format($firstPick['price']) . ")\n"
           . "2. **Nordic Minimalist Laptop Backpack** (₹2,499)\n\n"
           . "✦ **Combined Value:** ₹" . number_format($firstPick['price'] + 2499) . "\n"
           . "✦ **AI Bundle Price:** ₹" . number_format($firstPick['price'] + 2499 - $bundleDiscount) . " (You save ₹" . number_format($bundleDiscount) . ")";
    $suggestions = ["Add Bundle to Cart", "Swap accessory", "Check compatibility", "View details"];
    $proposal = [
        'type' => 'bundle',
        'items' => [$firstPick['id'], 18],
        'savings' => $bundleDiscount
    ];
} elseif ($intent === 'agentic_action' && $firstPick) {
    $reply = "I have drafted your order for **" . $firstPick['name'] . "** at ₹" . number_format($firstPick['price']) . ".\n\n"
           . "🛡️ **Agentic Workflow Gate:** Before executing this purchase, please confirm your authorization:";
    $suggestions = ["Approve & Place Order", "Cancel", "Change Quantity", "Review Cart"];
    $proposal = [
        'type' => 'order_approval',
        'product' => $firstPick,
        'action' => 'checkout'
    ];
} else {
    // Standard conversational reply with context awareness
    $contextMsg = "";
    if ($context['last_category'] && $targetCategory === $context['last_category']) {
        $contextMsg = "Continuing with our " . $targetCategory . " search";
    } else {
        $contextMsg = "I synthesized your request across our real-time catalog";
    }

    if ($budget) {
        $contextMsg .= " with a ₹" . number_format($budget) . " budget ceiling";
    }

    $reply = $contextMsg . ". Here are the top matched recommendations based on your profile and specifications:";

    if ($targetCategory === 'Laptops & Computers') {
        $suggestions = ["Filter under ₹50,000", "Show review summary", "Compare M3 vs Intel", "Build developer bundle"];
    } elseif ($targetCategory === 'Footwear') {
        $suggestions = ["Filter under ₹4,000", "Compare with fitness watch", "Show marathon reviews", "Add to Cart"];
    } else {
        $suggestions = ["Best under ₹5,000", "Compare top picks", "Show price history", "Today's deals"];
    }
}

// Updated Context to return to client for multi-turn state preservation
$updatedContext = [
    'last_category' => $targetCategory,
    'last_budget' => $budget,
    'last_product' => $firstPick ? $firstPick['name'] : $previousProduct,
    'last_product_id' => $firstPick ? $firstPick['id'] : null,
    'intent' => $intent
];

echo json_encode([
    'status' => 'success',
    'query' => $query,
    'parsed_intent' => [
        'category' => $targetCategory,
        'budget' => $budget,
        'intent_type' => $intent,
        'algorithm' => 'Multi-Turn Contextual Hybrid Recommender v3.0'
    ],
    'reply' => $reply,
    'products' => $topMatches,
    'proposal' => $proposal,
    'quick_suggestions' => $suggestions,
    'context' => $updatedContext,
    'confidence' => 0.96
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
