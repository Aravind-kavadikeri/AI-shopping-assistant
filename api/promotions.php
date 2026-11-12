<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$action = isset($input['action']) ? $input['action'] : (isset($_GET['action']) ? $_GET['action'] : 'list');

$activeCampaigns = [
    [
        'id' => 'CAMP-01',
        'title' => 'Fitness & Marathon Weekend',
        'target_audience' => 'Fitness enthusiasts & active marathon runners',
        'discount_percent' => 15,
        'code' => 'FITAI15',
        'products' => ['AeroStride Quantum Running Shoes', 'PulseSync Pro Smart Watch'],
        'expected_impact' => 'High (+28% projected sales)',
        'status' => 'Active',
        'redemptions' => 142
    ],
    [
        'id' => 'CAMP-02',
        'title' => 'Tech Minimalist Creator Bundle',
        'target_audience' => 'Software developers, designers & creators',
        'discount_percent' => 12,
        'code' => 'CREATOR800',
        'products' => ['Zenith UltraSlim 15 Carbon Laptop', 'Nordic Minimalist Backpack'],
        'expected_impact' => 'High (₹800 instant bundle discount)',
        'status' => 'Active',
        'redemptions' => 88
    ],
    [
        'id' => 'CAMP-03',
        'title' => 'Monsoon Trekker Flash Sale',
        'target_audience' => 'Outdoor hikers & backpackers',
        'discount_percent' => 20,
        'code' => 'TREK20',
        'products' => ['TerraGuard Alpha Waterproof Trekking Jacket', 'SoundSphere 360 Speaker'],
        'expected_impact' => 'Medium (+18% category boost)',
        'status' => 'Scheduled',
        'redemptions' => 0
    ]
];

if ($action === 'generate') {
    $prompt = isset($input['prompt']) ? trim($input['prompt']) : '';
    $lower = strtolower($prompt);

    if (strpos($lower, 'fitness') !== false || strpos($lower, 'run') !== false || strpos($lower, 'sports') !== false) {
        $generated = [
            'campaign_name' => 'Fitness Weekend AI Blitz',
            'target_audience' => 'Health & Fitness focused shoppers (browsed shoes, trackers)',
            'suggested_discount' => '15%',
            'discount_code' => 'FITWEEKEND15',
            'recommended_products' => ['AeroStride Quantum Running Shoes', 'PulseSync Pro Smart Fitness Watch'],
            'expected_impact' => 'High (+26% conversions, estimated ₹1.2L incremental GMV)',
            'ai_rationale' => 'Correlates users who added footwear with smart wearable accessories. 15% discount hits the optimal margin-volume sweet spot.'
        ];
    } elseif (strpos($lower, 'audio') !== false || strpos($lower, 'music') !== false || strpos($lower, 'sound') !== false) {
        $generated = [
            'campaign_name' => 'Sonic Immersion Fest',
            'target_audience' => 'Audiophiles & Remote professionals',
            'suggested_discount' => '18%',
            'discount_code' => 'SONIC18',
            'recommended_products' => ['Apex Pro ANC Wireless Headphones', 'SoundSphere 360 Bluetooth Speaker'],
            'expected_impact' => 'High (+32% cart conversions)',
            'ai_rationale' => 'Audio products exhibit 2.4x higher elasticity during midweek work sprints.'
        ];
    } else {
        $generated = [
            'campaign_name' => 'AI Smart Discovery Exclusive',
            'target_audience' => 'High-intent shoppers with cart dwell time > 2 minutes',
            'suggested_discount' => '10%',
            'discount_code' => 'DISCOVER10',
            'recommended_products' => ['Nordic Minimalist Backpack', 'Lumina Ambient Lamp'],
            'expected_impact' => 'Moderate (+15% cart recovery)',
            'ai_rationale' => 'Targeting cart abandoners with a limited 10% coupon recovers an average of 21% abandoned carts.'
        ];
    }

    echo json_encode([
        'status' => 'success',
        'generated_campaign' => $generated
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit();
}

echo json_encode([
    'status' => 'success',
    'campaigns' => $activeCampaigns
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
