<?php
// ==========================================================
// AI SHOPPING ASSISTANT - VISUAL SEARCH CONFIGURATION
// Secure Image Ingestion, MIME Validation & Storage Paths
// ==========================================================

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../i18n_helper.php';

define('VS_UPLOAD_DIR', __DIR__ . '/../../uploads/visual_search/');
define('VS_MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB
define('VS_ALLOWED_MIME_TYPES', [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]);
define('VS_ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'webp']);

// Ensure uploads folder exists
if (!is_dir(VS_UPLOAD_DIR)) {
    @mkdir(VS_UPLOAD_DIR, 0755, true);
}

/**
 * Validate and safely save an uploaded image file or base64 string
 *
 * @param array|string $fileData
 * @return array ['success' => bool, 'filename' => string, 'path' => string, 'error' => string|null]
 */
function validateAndSaveUpload($fileData) {
    // 1. Handle multipart $_FILES upload
    if (is_array($fileData) && isset($fileData['tmp_name'])) {
        if ($fileData['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'error' => 'File upload error code: ' . $fileData['error']];
        }

        if ($fileData['size'] > VS_MAX_FILE_SIZE) {
            return ['success' => false, 'error' => 'File exceeds maximum 5MB size limit.'];
        }

        // Validate MIME type via finfo
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($fileData['tmp_name']);
        if (!in_array(strtolower($mime), VS_ALLOWED_MIME_TYPES)) {
            return ['success' => false, 'error' => 'Invalid file type (' . htmlspecialchars($mime) . '). Supported formats: JPG, JPEG, PNG, WEBP.'];
        }

        // Check image dimensions
        $imgSize = @getimagesize($fileData['tmp_name']);
        if (!$imgSize || $imgSize[0] < 32 || $imgSize[1] < 32) {
            return ['success' => false, 'error' => 'Invalid image dimensions (minimum 32x32px required).'];
        }
        if ($imgSize[0] > 4096 || $imgSize[1] > 4096) {
            return ['success' => false, 'error' => 'Image dimensions exceed maximum 4096x4096px limit.'];
        }

        $ext = strtolower(pathinfo($fileData['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, VS_ALLOWED_EXTENSIONS)) $ext = 'jpg';

        $safeFilename = 'img_vs_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $ext;
        $destPath = VS_UPLOAD_DIR . $safeFilename;

        if (move_uploaded_file($fileData['tmp_name'], $destPath)) {
            return [
                'success' => true,
                'filename' => $safeFilename,
                'filepath' => $destPath,
                'relative_url' => 'uploads/visual_search/' . $safeFilename,
                'width' => $imgSize[0],
                'height' => $imgSize[1],
                'mime' => $mime,
                'size_bytes' => $fileData['size']
            ];
        }
        return ['success' => false, 'error' => 'Failed to persist uploaded image on server.'];
    }

    // 2. Handle Base64 Data URL upload
    if (is_string($fileData) && preg_match('/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/i', $fileData, $matches)) {
        $rawExt = strtolower($matches[1]);
        if ($rawExt === 'jpeg') $rawExt = 'jpg';
        $base64Content = $matches[2];
        $binary = base64_decode($base64Content);

        if (!$binary || strlen($binary) === 0) {
            return ['success' => false, 'error' => 'Malformed base64 image data.'];
        }

        if (strlen($binary) > VS_MAX_FILE_SIZE) {
            return ['success' => false, 'error' => 'Image exceeds 5MB size limit.'];
        }

        $safeFilename = 'img_vs_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $rawExt;
        $destPath = VS_UPLOAD_DIR . $safeFilename;

        if (file_put_contents($destPath, $binary) !== false) {
            $imgSize = @getimagesize($destPath);
            return [
                'success' => true,
                'filename' => $safeFilename,
                'filepath' => $destPath,
                'relative_url' => 'uploads/visual_search/' . $safeFilename,
                'width' => $imgSize ? $imgSize[0] : 400,
                'height' => $imgSize ? $imgSize[1] : 400,
                'mime' => 'image/' . $rawExt,
                'size_bytes' => strlen($binary)
            ];
        }
        return ['success' => false, 'error' => 'Failed to save base64 image.'];
    }

    return ['success' => false, 'error' => 'No valid image received. Please upload or capture an image.'];
}
