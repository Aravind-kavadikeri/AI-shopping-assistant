-- ==========================================================
-- AI SHOPPING ASSISTANT - DATABASE SCHEMA (MySQL / XAMPP)
-- Database Name: ai_shopping_assistant
-- Compatible with XAMPP (Apache + MySQL / MariaDB)
-- Advanced AI Intelligence Layer: Reviews, Price History & Notifications
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `ai_shopping_assistant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ai_shopping_assistant`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE (Role-Based Access & Authentication)
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('customer', 'merchant', 'admin') NOT NULL DEFAULT 'customer',
  `status` ENUM('Active', 'Deactivated') NOT NULL DEFAULT 'Active',
  `persona` VARCHAR(150) NULL,
  `location` VARCHAR(100) DEFAULT 'India',
  `badge` VARCHAR(100) DEFAULT '🛍️ Shopper',
  `preferred_language` VARCHAR(10) DEFAULT 'en' COMMENT 'en, kn, hi, ta, te, ml',
  `preferences` JSON NULL COMMENT 'Stores preferred categories, budget cap, favorite brands, style',
  `last_login` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_username` (`username`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB;

-- 1B. CATEGORIES TABLE
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `icon` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. PRODUCTS TABLE
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `original_price` DECIMAL(10, 2) NOT NULL,
  `rating` DECIMAL(3, 1) NOT NULL DEFAULT 4.5,
  `reviews_count` INT NOT NULL DEFAULT 120,
  `stock` INT NOT NULL DEFAULT 50,
  `image_url` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `features` JSON NOT NULL,
  `tags` VARCHAR(255) NOT NULL,
  `ai_score` INT NOT NULL DEFAULT 90,
  `views_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_cat_price` (`category`, `price`),
  INDEX `idx_ai_score` (`ai_score`)
) ENGINE=InnoDB;

-- 3. ORDERS TABLE (Unified with Razorpay Payment States)
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `discount_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `shipping_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `order_status` ENUM('Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `payment_status` ENUM('PENDING', 'CREATED', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `payment_method` VARCHAR(50) DEFAULT 'razorpay',
  `shipping_address` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_orders` (`user_id`, `created_at`),
  INDEX `idx_order_code` (`order_code`),
  INDEX `idx_payment_status` (`payment_status`)
) ENGINE=InnoDB;

-- 3B. ORDER ITEMS TABLE
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3C. TRANSACTIONS TABLE (Razorpay Payment Auditing)
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `gateway_name` VARCHAR(50) NOT NULL DEFAULT 'razorpay',
  `gateway_order_id` VARCHAR(100) NOT NULL,
  `gateway_payment_id` VARCHAR(100) NULL,
  `gateway_signature` VARCHAR(255) NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `amount_paise` INT NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `payment_status` ENUM('PENDING', 'CREATED', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `payment_method` VARCHAR(50) NULL,
  `signature_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `error_code` VARCHAR(100) NULL,
  `error_description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_gateway_order` (`gateway_order_id`),
  INDEX `idx_gateway_payment` (`gateway_payment_id`)
) ENGINE=InnoDB;

-- 3D. PAYMENT WEBHOOK EVENTS TABLE (Idempotent Webhook Processing)
DROP TABLE IF EXISTS `payment_webhook_events`;
CREATE TABLE `payment_webhook_events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_id` VARCHAR(100) NOT NULL UNIQUE,
  `event_type` VARCHAR(100) NOT NULL,
  `gateway_reference` VARCHAR(100) NULL,
  `processing_status` ENUM('received', 'processed', 'failed', 'ignored') NOT NULL DEFAULT 'received',
  `payload` JSON NOT NULL,
  `received_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `processed_at` TIMESTAMP NULL,
  INDEX `idx_event_type` (`event_type`)
) ENGINE=InnoDB;

-- 3E. ADMIN ACTIVITY LOGS TABLE
DROP TABLE IF EXISTS `admin_activity_logs`;
CREATE TABLE `admin_activity_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `target_entity` VARCHAR(50) NOT NULL,
  `target_id` VARCHAR(50) NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(50) DEFAULT '127.0.0.1',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Legacy purchases table for backwards compatibility
DROP TABLE IF EXISTS `purchases`;
CREATE TABLE `purchases` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) NOT NULL,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `discount_applied` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('Pending', 'Processing', 'Dispatched', 'Delivered') NOT NULL DEFAULT 'Processing',
  `purchase_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. BROWSING HISTORY TABLE (Drives Customer Analytics & Personalization)
DROP TABLE IF EXISTS `browsing_history`;
CREATE TABLE `browsing_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `dwell_time_seconds` INT DEFAULT 30,
  `action` VARCHAR(50) DEFAULT 'viewed',
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_time` (`user_id`, `timestamp`)
) ENGINE=InnoDB;

-- 5. WISHLIST TABLE
DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_prod` (`user_id`, `product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. INVENTORY TABLE
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `stock` INT NOT NULL,
  `min_threshold` INT NOT NULL DEFAULT 20,
  `status` ENUM('In Stock', 'Low Stock', 'Out of Stock') NOT NULL DEFAULT 'In Stock',
  `ai_predicted_demand` VARCHAR(50) DEFAULT 'Moderate',
  `reorder_suggestion` INT DEFAULT 0,
  `last_restocked` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. REVIEWS & AI SENTIMENT TABLE
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `rating` DECIMAL(2, 1) NOT NULL,
  `sentiment` ENUM('positive', 'neutral', 'negative') NOT NULL DEFAULT 'positive',
  `title` VARCHAR(200) NOT NULL,
  `comment` TEXT NOT NULL,
  `pros` VARCHAR(255) NULL,
  `cons` VARCHAR(255) NULL,
  `verified_purchase` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  INDEX `idx_prod_sentiment` (`product_id`, `sentiment`)
) ENGINE=InnoDB;

-- 8. PRICE HISTORY TABLE (Drives Price Intelligence & Price-Drop Alerts)
DROP TABLE IF EXISTS `price_history`;
CREATE TABLE `price_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `recorded_date` DATE NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  INDEX `idx_prod_date` (`product_id`, `recorded_date`)
) ENGINE=InnoDB;

-- 9. NOTIFICATIONS TABLE (Personalized Alerts & Price Drops)
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `product_id` INT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_read` (`user_id`, `is_read`)
) ENGINE=InnoDB;

-- 10. SENSOR DATA TABLE (ESP32 / SMART STORE IoT)
DROP TABLE IF EXISTS `sensor_data`;
CREATE TABLE `sensor_data` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `device_id` VARCHAR(50) NOT NULL COMMENT 'e.g. ESP32-SHELF-01',
  `shelf_zone` VARCHAR(50) NOT NULL DEFAULT 'Aisle 3 - Tech & Audio',
  `temperature` DECIMAL(4, 1) NOT NULL,
  `humidity` DECIMAL(4, 1) NOT NULL DEFAULT 54.0,
  `stock_level` INT NOT NULL COMMENT 'Percentage level detected by physical sensor',
  `product_count` INT NOT NULL,
  `is_simulated` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('Online', 'Offline', 'Warning') NOT NULL DEFAULT 'Online',
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_device_time` (`device_id`, `timestamp`)
) ENGINE=InnoDB;

-- 11. SEARCH QUERIES LOG (Search Analytics & Intent Tracking)
DROP TABLE IF EXISTS `search_logs`;
CREATE TABLE `search_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `query` VARCHAR(255) NOT NULL,
  `parsed_category` VARCHAR(100) NULL,
  `parsed_budget` DECIMAL(10, 2) NULL,
  `results_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 12. VISUAL SEARCH HISTORY TABLE (Image-Based Multimodal Discovery)
DROP TABLE IF EXISTS `visual_search_history`;
CREATE TABLE `visual_search_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `detected_category` VARCHAR(100) NOT NULL,
  `detected_type` VARCHAR(100) NOT NULL,
  `dominant_color` VARCHAR(50) NOT NULL,
  `visual_features` JSON NOT NULL,
  `combined_prompt` VARCHAR(255) NULL,
  `matched_product_ids` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_vs_user` (`user_id`, `created_at`)
) ENGINE=InnoDB;

-- 13. PRODUCT VISUAL EMBEDDINGS (64-D Vector Index for Cosine Similarity)
DROP TABLE IF EXISTS `product_visual_embeddings`;
CREATE TABLE `product_visual_embeddings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `dominant_color` VARCHAR(50) NOT NULL,
  `color_vector` JSON NOT NULL COMMENT '16-bin normalized color distribution',
  `feature_vector` JSON NOT NULL COMMENT '64-dimensional normalized vector embedding',
  `visual_tags` VARCHAR(255) NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================================
-- SEED DATA - CATEGORIES
-- ==========================================================
INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`) VALUES
(1, 'Laptops & Computers', 'laptops-computers', '💻', 'Developer ultrabooks, 4K workstations and creator hardware'),
(2, 'Electronics', 'electronics', '🎧', 'ANC spatial headphones, lossless audio and accessories'),
(3, 'Footwear', 'footwear', '👟', 'Marathon racing shoes, trail running and ergonomic sneakers'),
(4, 'Outdoor Gear', 'outdoor-gear', '🏔️', 'Waterproof alpine jackets, trekking poles and backpacks'),
(5, 'Bags & Accessories', 'bags-accessories', '🎒', 'Minimalist water-resistant backpacks and daily carry sleeves'),
(6, 'Wearables', 'wearables', '⌚', 'Biometric GPS sports watches and health tracking rings'),
(7, 'Smart Living', 'smart-living', '🏡', 'Studio monitors, solid wood ergonomic sit-stand desks and lighting');

-- ==========================================================
-- SEED DATA - USERS & PERSONAS (Customer & Admin Roles)
-- ==========================================================
INSERT INTO `users` (`id`, `name`, `username`, `email`, `phone`, `password_hash`, `role`, `status`, `persona`, `location`, `badge`, `preferred_language`, `preferences`) VALUES
(1, 'Aravind Sharma', 'aravind', 'aravind.sharma@techuni.edu', '+91 98765 43210', '$2y$10$eACCYoNOHEqgkVE8aIWT8eL2heW5ZlK3qPqFz2J4e8N9e1fS9kL3y', 'customer', 'Active', 'B.Tech Computer Science (3rd Year) • Tech-Savvy & Budget-Conscious', 'Bangalore, India', '🎓 Student Developer', 'en', '{"categories": ["Laptops & Computers", "Electronics", "Bags & Accessories", "Outdoor Gear"], "budgetCap": 75000, "style": "Modern Minimalist Tech"}'),
(2, 'Priya Patel', 'priya', 'priya.patel@athletics.in', '+91 98765 43211', '$2y$10$eACCYoNOHEqgkVE8aIWT8eL2heW5ZlK3qPqFz2J4e8N9e1fS9kL3y', 'customer', 'Active', 'Distance Runner & Wellness Trainer • Biometrics & Ergonomics Focused', 'Pune, India', '🏃‍♀️ Marathon Athlete', 'en', '{"categories": ["Footwear", "Wearables", "Outdoor Gear"], "budgetCap": 35000, "style": "Athletic Performance"}'),
(3, 'Vikramaditya Roy', 'vikram', 'vikram.roy@designstudio.co', '+91 98765 43212', '$2y$10$eACCYoNOHEqgkVE8aIWT8eL2heW5ZlK3qPqFz2J4e8N9e1fS9kL3y', 'customer', 'Active', 'UI/UX Architect & Studio Creator • Premium Ergonomics & 4K Display Purist', 'New Delhi, India', '🎨 Creative Director', 'en', '{"categories": ["Laptops & Computers", "Smart Living", "Electronics"], "budgetCap": 180000, "style": "Nordic Executive Studio"}'),
(4, 'Rajesh Menon', 'admin', 'rajesh.menon@shopai.internal', '+91 98765 43213', '$2y$10$f/9BvR9B9/k0J5pL3Wq8eOqL1v2X4z6w8A0bC2dE4fG6hI8jK0mN.', 'admin', 'Active', 'E-Commerce Administrator & Merchant Operations Director', 'Mumbai, India', '🏪 Operations Admin', 'en', '{"categories": ["All"], "budgetCap": 1000000, "style": "Retail Analytics"}');

-- ==========================================================
-- SEED DATA - VERIFIED ORDERS & TRANSACTIONS
-- ==========================================================
INSERT INTO `orders` (`id`, `order_code`, `user_id`, `subtotal`, `discount_amount`, `tax_amount`, `shipping_amount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `created_at`) VALUES
(1, 'ORD-1003', 1, 58199.00, 0.00, 10475.82, 0.00, 58199.00, 'Dispatched', 'PAID', 'razorpay', '2026-11-08 14:22:10'),
(2, 'ORD-1001', 1, 4999.00, 0.00, 899.82, 0.00, 4999.00, 'Delivered', 'PAID', 'razorpay', '2026-11-05 10:15:30');

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `total_price`) VALUES
(1, 1, 6, 'Zenith UltraSlim 15 Carbon Laptop', 1, 58199.00, 58199.00),
(2, 2, 1, 'Apex Pro ANC Wireless Headphones', 1, 4999.00, 4999.00);

INSERT INTO `transactions` (`id`, `order_id`, `user_id`, `gateway_name`, `gateway_order_id`, `gateway_payment_id`, `amount`, `amount_paise`, `currency`, `payment_status`, `payment_method`, `signature_verified`, `created_at`) VALUES
(1, 1, 1, 'razorpay', 'order_rzp_demo_1003', 'pay_rzp_demo_1003', 58199.00, 5819900, 'INR', 'PAID', 'upi', 1, '2026-11-08 14:23:05'),
(2, 2, 1, 'razorpay', 'order_rzp_demo_1001', 'pay_rzp_demo_1001', 4999.00, 499900, 'INR', 'PAID', 'card', 1, '2026-11-05 10:16:15');

-- ==========================================================
-- SEED DATA - REVIEWS & SENTIMENT
-- ==========================================================
INSERT INTO `reviews` (`product_id`, `user_id`, `author_name`, `rating`, `sentiment`, `title`, `comment`, `pros`, `cons`, `verified_purchase`) VALUES
(1, 1, 'Karthik Raman', 5.0, 'positive', 'Unmatched ANC for Open Plan Offices', 'The hybrid active noise cancellation cuts out background chatter effortlessly. Battery lasted 38 hours during my flight and workweek.', '40dB ANC, Long Battery Life, Plush Earcups', 'Slightly bulky carry case', 1),
(1, 2, 'Sneha Mukherjee', 4.5, 'positive', 'Great bass and clarity', 'Soundstage is expansive. Spatial audio works great with Apple Music.', 'Crystal highs, deep bass', 'Microphone quality is average in windy outdoors', 1),
(1, 3, 'Devendra V', 3.0, 'neutral', 'Good sound but tight clamp', 'Clamping force felt slightly tight during initial 3 days of wearing.', 'Audio quality, fast charging', 'Headband tension', 1),
(6, 1, 'Aditya Joshi', 5.0, 'positive', 'Best developer ultrabook under ₹60k', 'Compile times for Docker and Node packages are blazing fast. 2.8K OLED screen is stunning for code editors.', '12-Core CPU, Gorgeous OLED, 16GB RAM', 'Fan gets slightly audible under full benchmark load', 1),
(6, 3, 'Rohan Verma', 4.8, 'positive', 'Solid build and battery life', 'Aluminum unibody feels premium like a MacBook at half the cost. 8 hours battery with VS Code.', 'Lightweight 1.18kg, Thunderbolt 4', 'Webcam is 1080p but no physical shutter', 1),
(11, 2, 'Meera Nair', 5.0, 'positive', 'Game changer for half marathons', 'The nitrogen foam propulsion gives incredible bounce. Dropped 40 seconds off my 10k pace!', 'Energy return, featherlight, breathable', 'Runs half a size small', 1);

-- ==========================================================
-- SEED DATA - PRICE HISTORY (Last 30 Days)
-- ==========================================================
INSERT INTO `price_history` (`product_id`, `price`, `recorded_date`) VALUES
(1, 5499.00, DATE_SUB(CURDATE(), INTERVAL 30 DAY)),
(1, 5299.00, DATE_SUB(CURDATE(), INTERVAL 20 DAY)),
(1, 5199.00, DATE_SUB(CURDATE(), INTERVAL 10 DAY)),
(1, 4999.00, CURDATE()),
(6, 62999.00, DATE_SUB(CURDATE(), INTERVAL 30 DAY)),
(6, 59999.00, DATE_SUB(CURDATE(), INTERVAL 15 DAY)),
(6, 58999.00, CURDATE()),
(11, 4499.00, DATE_SUB(CURDATE(), INTERVAL 30 DAY)),
(11, 4199.00, DATE_SUB(CURDATE(), INTERVAL 14 DAY)),
(11, 3899.00, CURDATE());

-- ==========================================================
-- SEED DATA - NOTIFICATIONS
-- ==========================================================
INSERT INTO `notifications` (`user_id`, `type`, `title`, `message`, `product_id`, `is_read`) VALUES
(1, 'price_drop', 'Price Drop Alert on Apex Pro ANC', 'Apex Pro ANC Wireless Headphones dropped by ₹300! Now available for ₹4,999.', 1, 0),
(1, 'bundle', 'Creator Bundle Unlocked', 'Save ₹800 when purchasing Zenith Carbon Laptop with Nordic Minimalist Backpack.', 6, 0),
(2, 'restock', 'Running Footwear Back in Stock', 'AeroStride Quantum running shoes in size UK 8 have been replenished in our Pune hub.', 11, 0);

SET FOREIGN_KEY_CHECKS = 1;
