<?php
// ==========================================================
// AI SHOPPING ASSISTANT - SERVER-SIDE TRANSLATION HELPER
// ==========================================================

function getTranslation($key, $lang = null) {
    if (!$lang) {
        $lang = $_SESSION['preferred_language'] ?? $_GET['lang'] ?? 'en';
    }
    
    $supported = ['en', 'kn', 'hi', 'ta', 'te', 'ml'];
    if (!in_array($lang, $supported)) {
        $lang = 'en';
    }

    static $cache = [];
    if (!isset($cache[$lang])) {
        $file = __DIR__ . "/../languages/{$lang}.php";
        if (file_exists($file)) {
            $cache[$lang] = require $file;
        } else {
            $cache[$lang] = [];
        }
    }

    if (isset($cache[$lang][$key])) {
        return $cache[$lang][$key];
    }

    // Fallback to English
    if (!isset($cache['en'])) {
        $enFile = __DIR__ . "/../languages/en.php";
        $cache['en'] = file_exists($enFile) ? require $enFile : [];
    }

    return $cache['en'][$key] ?? $key;
}
