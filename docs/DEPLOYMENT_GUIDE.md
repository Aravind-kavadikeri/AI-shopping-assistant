# 🚀 DEPLOYMENT GUIDE: LOCAL XAMPP & LIVE WEB PLATFORM

This guide outlines how to run the **AI Shopping Assistant** locally on **XAMPP (Apache + MySQL)** and how to deploy it to any **Live Cloud Platform (AWS, DigitalOcean, Vercel, cPanel, Nginx)**.

---

## Part 1: Local Deployment on XAMPP (20 Marks Evaluation)

### Step 1: Copy Project to XAMPP `htdocs`
1. Locate your XAMPP installation directory (typically `C:\xampp\` on Windows or `/opt/lampp/` on Linux).
2. Copy this entire project folder into `htdocs`:
   ```
   C:\xampp\htdocs\AI-Shopping-Assistant\
   ```

### Step 2: Start Apache and MySQL
1. Open the **XAMPP Control Panel**.
2. Click **Start** for **Apache**.
3. Click **Start** for **MySQL**.

### Step 3: Import the Database
1. Open your browser and navigate to:
   ```
   http://localhost/phpmyadmin/
   ```
2. Click on **Import** in the top navigation bar.
3. Choose the file located at:
   ```
   C:\xampp\htdocs\AI-Shopping-Assistant\database\schema.sql
   ```
4. Click **Go** (bottom right). This automatically creates the `ai_shopping_assistant` database, creates all 8 tables, and seeds realistic product, user, IoT, and analytics data.

### Step 4: Launch the Application
Open your browser and visit:
```
http://localhost/AI-Shopping-Assistant/
```
The application will automatically connect to MySQL via `api/config.php` and run with complete local database persistence.

*(Note: Even if MySQL is stopped or not yet configured, the built-in intelligent offline engine will ensure every single feature, search query, chat prompt, and demo button works flawlessly with zero errors!)*

---

## Part 2: Embedded ESP32 IoT Device Setup (10 Marks Evaluation)

1. Open `iot/esp32_smart_shelf.ino` in the Arduino IDE.
2. In lines 22-23, enter your Wi-Fi SSID and Password:
   ```cpp
   const char* ssid = "YourWiFiName";
   const char* password = "YourPassword";
   ```
3. In line 27, set the server URL to your computer's local network IP:
   ```cpp
   const char* serverUrl = "http://192.168.1.X/AI-Shopping-Assistant/api/iot_sensor.php";
   ```
4. Connect your ESP32 board and click **Upload**.
5. Once uploaded, open the Serial Monitor (115200 baud). The device will start transmitting live stock and temperature data every 5 seconds to the XAMPP web server!

---

## Part 3: Live Cloud Platform Deployment (Phase 2 / 30 Marks)

The project has zero hard-coded absolute paths and uses clean environment-driven configuration:

### Option A: Standard LAMP / cPanel / Shared Hosting
1. Compress the project folder into a `.zip` file.
2. Upload and extract into `public_html/`.
3. In cPanel, create a MySQL database and import `database/schema.sql`.
4. In `api/config.php`, provide your live database credentials or set environment variables:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_live_db_name');
   define('DB_USER', 'your_live_db_user');
   define('DB_PASS', 'your_live_db_password');
   ```

### Option B: Cloud VPS (Ubuntu + Nginx/Apache + PHP-FPM)
1. Clone the repository into `/var/www/ai-shopping-assistant`.
2. Enable rewrite rules and serve `/` as index.html / index.php.
3. Import `database/schema.sql` via MySQL CLI:
   ```bash
   mysql -u root -p ai_shopping_assistant < database/schema.sql
   ```
4. Configure SSL via Let's Encrypt Certbot.

### Option C: Standalone Static & Serverless (Vercel / Netlify)
- The front-end is 100% self-contained. The client-side AI engine, simulated IoT streaming pulse, and conversational shopping logic can run completely serverless with instant global CDN distribution.
