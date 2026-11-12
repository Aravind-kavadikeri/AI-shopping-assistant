# ✦ ShopAI — Autonomous AI Shopping Assistant & Retail Intelligence

> **Tagline**: *"Your AI-Powered Personal Shopping Companion"*  
> **Evaluation Rubrics**: PPT Presentation (10M) • Relevance of Title (5M) • AI & Data Analytics • Embedded/IoT (10M) • Teamwork (5M) • XAMPP Local Server (20M) • Live Platform/Phase 2 (30M) • Overall Project Working (20M)  
> **Built by**: Team TechBees

---

## 🌟 Executive Summary

**ShopAI** is a next-generation AI-powered e-commerce platform and retail intelligence ecosystem. Built with a sophisticated **Glassmorphism Design System** (dark futuristic navy/black, electric blue, cyan, and violet accents), it bridges **Conversational AI**, **Machine Learning recommendation scoring**, **Physical Store IoT telemetry (ESP32 Smart Shelves)**, and **Predictive Merchant Analytics**.

The platform is engineered with a **dual architecture**:
1. **Local XAMPP Ready**: PHP REST API + MySQL database schema (`database/schema.sql`) for `http://localhost/AI-Shopping-Assistant/`.
2. **Live Cloud & Serverless Ready**: Zero-dependency standalone client engine (`server.js` / `index.html`) with high-resiliency offline fallbacks.

---

## 🎯 Evaluation Rubric Defense & Mapping

| Evaluation Category | Marks | Project Feature Implementation |
|---|---|---|
| **1. PPT Presentation** | **10** | Integrated **"How It Works" (5 Steps)** & interactive architecture visualizer in the web UI, plus complete 10-slide guide in [`docs/PPT_PRESENTATION_GUIDE.md`](docs/PPT_PRESENTATION_GUIDE.md) |
| **2. Relevance of Title** | **5** | **AI** (NLP intent extraction, match scoring, predictive restock) + **Shopping** (catalog, cart, deals) + **Assistant** (conversational chat, voice input simulation, floating assistant orb) |
| **3. AI & Data Analytics** | **High** | **AI Insight Engine** (cross-sell affinity, demand velocity, dynamic pricing) + **AI Recommendation Engine** (precision match scores e.g. 96%, transparent "Why AI Recommends This" rationales) |
| **4. Embedded / IoT** | **10** | **ESP32 Smart Shelf Integration**: Hardware C++ script ([`iot/esp32_smart_shelf.ino`](iot/esp32_smart_shelf.ino)), circuit guide ([`iot/circuit_diagram_guide.md`](iot/circuit_diagram_guide.md)), and live web telemetry panel with Online status, 24.6°C temp, 82% stock, and simulation toggle |
| **5. Teamwork** | **5** | Dedicated **"Our Team"** section showcasing balanced multi-disciplinary roles (AI/ML, Frontend/UI, Backend/DB, IoT/Embedded, Analytics/QA) |
| **6. XAMPP Local Server** | **20** | Clean, portable PHP REST backend + MySQL database schema (`database/schema.sql`) placed in `htdocs/AI-Shopping-Assistant/`, zero-crash offline fallbacks |
| **7. Live Platform / Phase 2** | **30** | Modular architecture, decoupled configuration variables (`api/config.php`), scalable REST APIs, responsive glassmorphism UI ready for cloud deployment |
| **8. Overall Project Working** | **20** | 100% interactive end-to-end flow: Search -> Chat -> Match % -> Compare -> Cart Savings -> Merchant Analytics -> IoT Shelf Telemetry -> AI Campaign Generator |

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

## 🧭 10-Step Live Demonstration Flow for Judges

On the Home landing page, click the **"Quick Judge Evaluation Launcher"** or follow these 10 steps:

1. **Hero & AI Orb**: Open the landing page. Note the glowing animated AI orb, neural particles, and floating match badges.
2. **Natural Language Search**: Go to *Discover*. Enter `"Waterproof jacket under ₹8,000 for trekking"`. Notice how the system extracts Budget (₹8,000) and Category (Outdoor Gear).
3. **Transparent AI Match Score**: Click any product to inspect the **94% AI Match** and read the *"Why AI Recommends This"* explanation.
4. **Product Comparison Matrix**: Click *Compare*. Inspect the side-by-side spec comparison and the **AI Winner** highlighted with a glowing electric cyan border.
5. **Smart Cart & Bundle Savings**: Add the *Zenith UltraSlim 15 Laptop* and *Nordic Minimalist Backpack* to the cart. Observe the **"AI Savings Suggestion: You saved ₹800 by choosing this bundle"**.
6. **Conversational Shopping Assistant**: Open *AI Assistant* or click the bottom-right **Floating AI Orb**. Ask: *"Find me a waterproof jacket under ₹8,000"*. Test the voice mic simulation.
7. **Merchant Dashboard & KPIs**: Switch to *Dashboard*. View real-time revenue (₹2,48,950), conversion rate (3.84%), weekly trend canvas chart, and category GMV share.
8. **AI Business Insights**: In the Merchant view, review the **Demand Prediction** (*"Running shoes selling 34% faster this week"*) and **Cross-Sell Affinity** insights.
9. **Smart Shopping IoT Panel**: Open *IoT Shelf*. Observe the live **ESP32 Smart Shelf** telemetry (● Online, 24.6°C, 82% Stock, 41 count). Click **"Trigger Sensor Pulse"** or **"Simulate Low Stock Alert"**.
10. **Targeted AI Campaign Generator**: Go to *AI Campaigns*. Enter `"Create a promotion for customers interested in fitness"`. Watch the AI instantly generate the *"Fitness Weekend"* campaign, 15% discount, and bundle configuration.

---

## 🛠️ Project File Architecture

```
AI-Shopping-Assistant/
├── index.html                   # Premium responsive Glassmorphism Web App
├── index.php                    # XAMPP entry point
├── server.js                    # Zero-dependency Node.js server runner
├── package.json                 # Project descriptor and scripts
├── api/                         # PHP REST Backend Endpoints
│   ├── config.php               # Environment configuration & DB connection
│   ├── products.php             # Product catalog, filtering & sorting
│   ├── chat.php                 # Conversational NLP assistant handler
│   ├── iot_sensor.php           # ESP32 telemetry receiver & status streamer
│   ├── analytics.php            # Merchant KPIs, chart metrics & AI insights
│   └── promotions.php           # AI campaign generator
├── assets/
│   ├── css/
│   │   └── glassmorphism.css    # Complete Glassmorphism Design System
│   └── js/
│       ├── store.js             # Data models, cart logic & simulated state
│       ├── ai-engine.js         # NLP parser & recommendation algorithms
│       ├── analytics-charts.js  # Canvas & SVG chart rendering engines
│       └── app.js               # Main view router & interaction controller
├── database/
│   └── schema.sql               # 8-Table MySQL relational database script
├── iot/
│   ├── esp32_smart_shelf.ino    # Arduino C++ firmware for ESP32
│   └── circuit_diagram_guide.md # Hardware wiring, pinout & schematic guide
└── docs/
    ├── PPT_PRESENTATION_GUIDE.md# 10-Slide presentation guide for defense
    └── DEPLOYMENT_GUIDE.md      # XAMPP & Live platform deployment instructions
```

---

## 👥 Team TechBees — Roles & Contributions

- **Aravind S.** — *AI & Recommendation Models* (NLP intent parser, match scoring algorithm, dynamic bundle pricing)
- **Sneha K.** — *Frontend & UI/UX* (Glassmorphism design system, animated orbs, responsive layouts)
- **Karthik R.** — *Embedded Systems / IoT* (ESP32 C++ firmware, ultrasonic stock sensor integration, HTTP API)
- **Vikram N.** — *Backend & Database* (MySQL 8-table relational schema, PHP REST controllers, analytics pipeline)
