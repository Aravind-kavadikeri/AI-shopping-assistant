# ✦ ShopAI — Autonomous AI Shopping Assistant & Retail Intelligence

> **Tagline**: *"Shopping, Reimagined by AI"*  
> **Architecture**: PHP REST APIs • MySQL Database • Node.js Server • Razorpay Gateway • 3D Three.js Portal

---

## 🌟 Executive Summary

**ShopAI** is a next-generation AI-powered e-commerce platform and retail intelligence ecosystem. Built with a sophisticated **Minimalist Deep Teal + Coral Design System**, it bridges **Conversational AI Copilot**, **AI Visual Product Search**, **Explainable Machine Learning recommendation scoring**, **Razorpay Payment Gateway with Official Tax Invoicing**, **Physical Store IoT telemetry (ESP32 Smart Shelves)**, and **Predictive Merchant Analytics**.

The platform is engineered with a **dual architecture**:
1. **Local XAMPP Ready**: PHP REST APIs + MySQL relational schema (`database/schema.sql`) for `http://localhost/AI-Shopping-Assistant/`.
2. **Integrated Full-Stack Server**: Standalone zero-dependency Node.js engine (`server.js`) with complete in-memory fallback emulation, REST endpoints, and instant local execution.

---

## ⚡ Quick Start Options

### Option 1: Standalone Instant Preview (Node.js)
```bash
# In the project directory:
npm start
# or:
node server.js
```
Open **`http://localhost:3000`** in any web browser.

### Option 2: Local XAMPP Server (`htdocs`)
1. Copy this folder into your XAMPP web root:
   ```
   C:\xampp\htdocs\AI-Shopping-Assistant\
   ```
2. Start **Apache** and **MySQL** in the XAMPP Control Panel.
3. Open `http://localhost/phpmyadmin/` and import [`database/schema.sql`](database/schema.sql).
4. Visit **`http://localhost/AI-Shopping-Assistant/`** in your browser.

---

## 🧭 Interactive Feature Tour

Explore the platform through its core intelligent capabilities:

1. **3D Cinematic Smart Shopping Portal**: Realistic 3D portal animation built with Three.js, featuring smooth lighting, atmospheric particles, and centered brand reveal.
2. **AI Visual Product Search**: Upload, drag-and-drop, or capture product images with webcam to search with 64-dimensional feature vector embeddings and category cosine similarity.
3. **Natural Language Search**: Go to *Discover*. Enter natural queries like *"Waterproof jacket under ₹8,000 for trekking"*. The NLP engine parses budget and category automatically.
4. **Transparent AI Match Score**: Click any product to inspect real-time **AI Match Percentage** (e.g. 96%) with explainable rationale badges.
5. **Product Comparison Matrix**: Select multiple products to compare specs, ratings, and features side-by-side with automated AI Winner highlighting.
6. **Smart Cart & Bundle Savings**: Add complementary items to automatically unlock smart bundle discounts (e.g. Save ₹800 instantly on Creator Tech Bundles).
7. **Razorpay Payment Gateway**: Seamless checkout with test mode credit/debit card, instant UPI QR code, and Netbanking with simulated failure and success handling.
8. **Automated Official Tax Invoice**: Instant printable GST tax invoice with CGST/SGST tax breakdown, QR verification code, and one-click PDF printing.
9. **Conversational Shopping Copilot**: Open *AI Assistant* or launch the persistent floating assistant launcher to ask questions, explore deals, or receive personalized shopping recommendations.
10. **Merchant Analytics & IoT Telemetry**: Switch to *Dashboard* for real-time revenue analytics, conversion funnels, and live ESP32 Smart Shelf inventory tracking.
11. **Multilingual Support**: Real-time language switching across English, Kannada (ಕನ್ನಡ), Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), and Malayalam (മലയാളം).

---

## 🛠️ Project File Architecture

```
AI-Shopping-Assistant/
├── index.html                   # Responsive Commerce Web Application
├── index.php                    # XAMPP entry point
├── server.js                    # Full-stack Node.js server with REST APIs
├── package.json                 # Project descriptor and scripts
├── api/                         # PHP REST Backend Endpoints
│   ├── config.php               # Database configuration & PDO connection
│   ├── products.php             # Product catalog, filtering & sorting
│   ├── chat.php                 # Conversational NLP assistant handler
│   ├── orders.php               # Orders creation and history
│   ├── change-password.php      # User password management
│   ├── iot_sensor.php           # ESP32 telemetry receiver & status streamer
│   ├── analytics.php            # Merchant KPIs, chart metrics & AI insights
│   ├── promotions.php           # AI campaign generator
│   ├── payment/                 # Razorpay Payment Gateway Endpoints
│   │   ├── create-order.php     # Order creation with GST & discounts
│   │   ├── verify.php           # Cryptographic HMAC SHA-256 verification
│   │   └── status.php           # Payment status lookup
│   └── visual-search/           # AI Multimodal Visual Search
│       ├── analyse.php          # Image attribute extraction & classification
│       ├── search.php           # Vector cosine similarity matching
│       └── embedding_engine.php # 64-D vector generator
├── assets/
│   ├── css/
│   │   └── glassmorphism.css    # Deep Teal + Coral Design System & themes
│   └── js/
│       ├── store.js             # Data models, cart logic & reactive store
│       ├── ai-engine.js         # NLP parser, visual embeddings & recommendations
│       ├── analytics-charts.js  # Canvas & SVG chart rendering engines
│       ├── portal-splash.js     # Three.js 3D Smart Shopping Portal
│       ├── i18n.js              # Multilingual internationalization dictionary
│       └── app.js               # Main view router & component controller
├── database/
│   ├── schema.sql               # MySQL relational database script
│   └── catalog_embeddings.json  # Pre-computed 64-D product feature vectors
├── iot/
│   ├── esp32_smart_shelf.ino    # Arduino C++ firmware for ESP32
│   └── circuit_diagram_guide.md # Hardware wiring, pinout & schematic guide
└── docs/
    ├── PPT_PRESENTATION_GUIDE.md# Project presentation guide
    └── DEPLOYMENT_GUIDE.md      # XAMPP & Live platform deployment instructions
```
