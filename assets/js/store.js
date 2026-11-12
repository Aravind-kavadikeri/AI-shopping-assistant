/**
 * =========================================================================
 * ShopAI - Central State Store & Real-World User Profiling Engine
 * Connects Frontend UI with LocalStorage, Node Server & XAMPP PHP REST Backend
 * =========================================================================
 */

const Store = {
  // Current active view
  currentView: 'home',

  // Authentication Gateway State: Requires login or registration before entering home page
  isAuthenticated: (function() {
    try {
      return sessionStorage.getItem('shopai_authenticated') === 'true';
    } catch(e) {
      return false;
    }
  })(),

  // API Client Base URL (Relative for seamless XAMPP & standalone hosting)
  apiBase: 'api',

  // Grounded Real-World Shopper Profiles & Personas (No Random Names)
  profiles: {
    aravind: {
      id: 1,
      key: 'aravind',
      name: "Aravind Sharma",
      title: "College Student & Software Developer",
      persona: "B.Tech Computer Science (3rd Year) • Tech-Savvy & Budget-Conscious",
      email: "aravind.sharma@techuni.edu",
      role: "customer",
      location: "Bangalore, India",
      avatarInitials: "AS",
      badge: "🎓 Student Developer",
      preferences: {
        categories: ["Laptops & Computers", "Electronics", "Bags & Accessories", "Outdoor Gear"],
        budgetCap: 75000,
        favoriteBrands: ["Apple", "Intel", "Sony", "Nordic", "Decathlon"],
        style: "Modern Minimalist Tech",
        shoppingGoal: "Performance, ML Compilation & Long Battery Life",
        priceSensitivity: "High (Looks for student discounts & value)"
      }
    },
    priya: {
      id: 2,
      key: 'priya',
      name: "Priya Patel",
      title: "Endurance Athlete & Marathon Coach",
      persona: "Distance Runner & Wellness Trainer • Biometrics & Ergonomics Focused",
      email: "priya.patel@athletics.in",
      role: "customer",
      location: "Pune, India",
      avatarInitials: "PP",
      badge: "🏃‍♀️ Marathon Athlete",
      preferences: {
        categories: ["Footwear", "Wearables", "Outdoor Gear"],
        budgetCap: 35000,
        favoriteBrands: ["AeroStride", "PulseSync", "TerraGuard", "Nike"],
        style: "Athletic Performance",
        shoppingGoal: "Joint Cushioning, Waterproofing & Health Metrics",
        priceSensitivity: "Medium (Invests in joint protection & durability)"
      }
    },
    vikram: {
      id: 3,
      key: 'vikram',
      name: "Vikramaditya Roy",
      title: "Creative Director & Remote Architect",
      persona: "UI/UX Architect & Studio Creator • Premium Ergonomics & 4K Display Purist",
      email: "vikram.roy@designstudio.co",
      role: "customer",
      location: "New Delhi, India",
      avatarInitials: "VR",
      badge: "🎨 Creative Director",
      preferences: {
        categories: ["Laptops & Computers", "Smart Living", "Electronics"],
        budgetCap: 180000,
        favoriteBrands: ["Apple", "UltraView", "Lumina", "AuraStudio"],
        style: "Nordic Executive Studio",
        shoppingGoal: "Color-Accurate Displays, Lossless Audio & Solid Wood Ergonomics",
        priceSensitivity: "Low (Uncompromising on build quality & aesthetic)"
      }
    },
    rajesh: {
      id: 4,
      key: 'rajesh',
      name: "Rajesh Menon",
      title: "Head of Retail Intelligence & Store Operations",
      persona: "E-Commerce Administrator & Merchant Operations Director",
      email: "rajesh.menon@shopai.internal",
      role: "merchant",
      location: "Mumbai, India",
      avatarInitials: "RM",
      badge: "🏪 Operations Admin",
      preferences: {
        categories: ["All"],
        budgetCap: 1000000,
        style: "Retail Analytics",
        shoppingGoal: "Gross Margin, Turn Rate & Restock Efficiency",
        priceSensitivity: "Neutral"
      }
    }
  },

  // Active User Profile (Defaults to Aravind Sharma)
  user: {
    id: 1,
    key: 'aravind',
    name: "Aravind Sharma",
    title: "College Student & Software Developer",
    persona: "B.Tech Computer Science (3rd Year) • Tech-Savvy & Budget-Conscious",
    email: "aravind.sharma@techuni.edu",
    role: "customer",
    location: "Bangalore, India",
    avatarInitials: "AS",
    badge: "🎓 Student Developer",
    preferences: {
      categories: ["Laptops & Computers", "Electronics", "Bags & Accessories", "Outdoor Gear"],
      budgetCap: 75000,
      favoriteBrands: ["Apple", "Intel", "Sony", "Nordic", "Decathlon"],
      style: "Modern Minimalist Tech",
      shoppingGoal: "Performance, ML Compilation & Long Battery Life",
      priceSensitivity: "High (Looks for student discounts & value)"
    }
  },

  // Products Catalog (28 Items across 7 Categories)
  products: [],

  // Cart State (Persisted in localStorage)
  cart: [],

  // Wishlist State (Array of product IDs)
  wishlist: [1, 6, 19],

  // Comparison List (Array of product IDs, 2 to 4 items)
  compareList: [6, 7],

  // Orders history
  orders: [
    {
      order_code: "ORD-1003",
      user_id: 1,
      product_id: 6,
      product_name: "Zenith UltraSlim 15 Carbon Laptop",
      category: "Laptops & Computers",
      image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      quantity: 1,
      total_amount: 58199.00,
      status: "Dispatched",
      purchase_date: "2026-11-08 14:22:10"
    },
    {
      order_code: "ORD-1001",
      user_id: 1,
      product_id: 1,
      product_name: "Apex Pro ANC Wireless Headphones",
      category: "Electronics",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      quantity: 1,
      total_amount: 4999.00,
      status: "Delivered",
      purchase_date: "2026-11-05 10:15:30"
    }
  ],

  // Merchant Analytics KPIs (Calculated from real database purchases)
  merchant: {
    totalRevenue: 167390,
    revenueFormatted: "₹1,67,390",
    revenueGrowth: "+22.4%",
    totalOrders: 12,
    ordersGrowth: "+16.8%",
    activeCustomers: 4,
    customersGrowth: "+30.0%",
    conversionRate: "4.8%",
    avgOrderValue: "₹13,949",
    productsSold: 16,
    charts: {
      revenueTrend: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [14999, 18899, 60698, 12499, 21499, 23798, 14998] },
      categorySales: { labels: ['Laptops & Computers', 'Electronics', 'Footwear', 'Outdoor Gear', 'Bags & Accessories', 'Wearables', 'Smart Living'], values: [84999, 28999, 18999, 14499, 8999, 6999, 3896], percentages: [51, 17, 11, 9, 5, 4, 3] },
      peakHours: { labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM'], traffic: [120, 340, 680, 590, 720, 890, 1420, 1180, 410] },
      topProducts: [],
      mostViewed: []
    },
    inventoryAlerts: [],
    aiInsights: []
  },

  // In-App Personalized Notifications
  notifications: [
    { id: 1, type: 'price_drop', title: 'Price Drop Alert on Apex Pro ANC', message: 'Apex Pro ANC dropped by ₹300! Now available for ₹4,999.', product_id: 1, is_read: 0, created_at: '10 mins ago' },
    { id: 2, type: 'bundle', title: 'Creator Bundle Unlocked', message: 'Save ₹800 when purchasing Zenith Carbon Laptop with Nordic Minimalist Backpack.', product_id: 6, is_read: 0, created_at: '2 hours ago' },
    { id: 3, type: 'restock', title: 'Running Footwear Back in Stock', message: 'AeroStride Quantum running shoes in size UK 8 have been replenished in our Pune hub.', product_id: 11, is_read: 1, created_at: '1 day ago' }
  ],
  unreadNotificationsCount: 2,

  // Notification helper
  toasts: [],

  // Theme preference
  theme: localStorage.getItem('shopai_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),

  // Load state from localStorage on startup
  initStorage() {
    try {
      const authState = sessionStorage.getItem('shopai_authenticated');
      this.isAuthenticated = (authState === 'true');

      const savedTheme = localStorage.getItem('shopai_theme');
      if (savedTheme) this.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', this.theme);

      const savedCart = localStorage.getItem('shopai_cart');
      if (savedCart) this.cart = JSON.parse(savedCart);

      const savedWishlist = localStorage.getItem('shopai_wishlist');
      if (savedWishlist) this.wishlist = JSON.parse(savedWishlist);

      const savedCompare = localStorage.getItem('shopai_compare');
      if (savedCompare) this.compareList = JSON.parse(savedCompare);

      const savedUser = localStorage.getItem('shopai_user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      } else {
        this.user = JSON.parse(JSON.stringify(this.profiles.aravind));
      }

      const savedOrders = localStorage.getItem('shopai_orders');
      if (savedOrders) this.orders = JSON.parse(savedOrders);
    } catch (e) {}

    // Default initial cart if empty
    if (!this.cart || this.cart.length === 0) {
      this.cart = [{ productId: 1, quantity: 1 }];
    }
  },

  saveStorage() {
    try {
      sessionStorage.setItem('shopai_authenticated', this.isAuthenticated ? 'true' : 'false');
      localStorage.setItem('shopai_cart', JSON.stringify(this.cart));
      localStorage.setItem('shopai_wishlist', JSON.stringify(this.wishlist));
      localStorage.setItem('shopai_compare', JSON.stringify(this.compareList));
      localStorage.setItem('shopai_user', JSON.stringify(this.user));
      localStorage.setItem('shopai_orders', JSON.stringify(this.orders));
      localStorage.setItem('shopai_theme', this.theme);
    } catch (e) {}
  },

  // Direct Authentication Setter
  authenticate(userObj) {
    this.isAuthenticated = true;
    if (userObj) {
      this.user = userObj;
    }
    try {
      sessionStorage.setItem('shopai_authenticated', 'true');
      localStorage.setItem('shopai_user', JSON.stringify(this.user));
    } catch (e) {}
    this.recalculateAllScores();
    this.triggerAppUpdate();
  },

  // Clear Session Logout
  logout() {
    this.isAuthenticated = false;
    try {
      sessionStorage.removeItem('shopai_authenticated');
      localStorage.removeItem('shopai_user');
    } catch (e) {}
    this.user = JSON.parse(JSON.stringify(this.profiles.aravind));
    this.triggerAppUpdate();
  },

  // Toggle between Light & Dark Theme
  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('shopai_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const toggleText = document.getElementById('theme-toggle-text');
    if (toggleIcon) toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (toggleText) toggleText.textContent = theme === 'dark' ? 'Light' : 'Dark';

    if (window.AnalyticsCharts) {
      if (document.getElementById('analytics-revenue-canvas')) AnalyticsCharts.renderRevenueChart('analytics-revenue-canvas');
      if (document.getElementById('merchant-revenue-canvas')) AnalyticsCharts.renderRevenueChart('merchant-revenue-canvas');
      if (document.getElementById('analytics-peak-canvas')) AnalyticsCharts.renderPeakHoursChart('analytics-peak-canvas');
      if (document.getElementById('analytics-category-bars')) AnalyticsCharts.renderCategoryBars('analytics-category-bars');
      if (document.getElementById('merchant-category-bars')) AnalyticsCharts.renderCategoryBars('merchant-category-bars');
    }
  },

  // Switch Active Shopper Persona (Aravind, Priya, Vikram, Rajesh)
  switchProfile(profileKey) {
    if (this.profiles[profileKey]) {
      this.user = JSON.parse(JSON.stringify(this.profiles[profileKey]));
      this.isAuthenticated = true;
      try {
        sessionStorage.setItem('shopai_authenticated', 'true');
      } catch (e) {}
      
      // Update persona-specific default wishlist & compare
      if (profileKey === 'aravind') {
        this.wishlist = [1, 6, 19];
        this.compareList = [6, 7];
      } else if (profileKey === 'priya') {
        this.wishlist = [15, 16, 23];
        this.compareList = [15, 16];
      } else if (profileKey === 'vikram') {
        this.wishlist = [4, 10, 28];
        this.compareList = [7, 8];
      } else if (profileKey === 'rajesh') {
        this.wishlist = [6, 11, 25];
        this.compareList = [6, 7];
      }

      this.recalculateAllScores();
      this.saveStorage();
      this.triggerAppUpdate();
      return this.user;
    }
    return null;
  },

  // Recalculate AI Recommendation Scores across all products for current persona
  recalculateAllScores() {
    if (!this.products || this.products.length === 0) return;
    const u = this.user;
    const cats = (u.preferences && u.preferences.categories) || [];
    const budget = (u.preferences && u.preferences.budgetCap) || 75000;

    this.products.forEach(p => {
      let catScore = cats.includes(p.category) ? 35 : 15;
      if (cats.includes('All')) catScore = 30;

      let budScore = 20;
      if (p.price <= budget) {
        budScore = 25;
      } else {
        const ratio = (p.price - budget) / budget;
        budScore = Math.max(5, 25 - Math.round(ratio * 30));
      }

      const ratingScore = Math.round((p.rating / 5) * 15);
      const stockScore = (p.stock > 0) ? 5 : 0;
      const baseScore = Math.min(98, Math.max(72, catScore + budScore + ratingScore + stockScore + Math.floor(Math.random() * 5)));
      
      p.aiScore = baseScore;
      if (cats.includes(p.category) && p.price <= budget) {
        p.aiReason = `Matches ${u.name.split(' ')[0]}'s ${p.category} profile and ₹${budget.toLocaleString()} budget.`;
      } else if (p.price <= budget) {
        p.aiReason = `Within ${u.name.split(' ')[0]}'s ₹${budget.toLocaleString()} budget with ${p.rating}★ rating.`;
      } else {
        p.aiReason = `Premium option evaluated for high-performance specifications.`;
      }
    });
  },

  // Fetch Analytics with date range filtering (today, 7d, 30d, 90d, custom)
  async fetchAnalytics(dateRange = '7d', startDate = null, endDate = null) {
    try {
      let queryUrl = `${this.apiBase}/analytics.php?date_range=${encodeURIComponent(dateRange)}`;
      if (startDate && endDate) {
        queryUrl += `&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`;
      }

      const res = await fetch(queryUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.kpis) {
          this.merchant.totalRevenue = data.kpis.total_revenue;
          this.merchant.revenueFormatted = data.kpis.revenue_formatted;
          this.merchant.revenueGrowth = data.kpis.revenue_growth || '+18.4%';
          this.merchant.totalOrders = data.kpis.total_orders;
          this.merchant.ordersGrowth = data.kpis.orders_growth || '+12.6%';
          this.merchant.activeCustomers = data.kpis.total_customers;
          this.merchant.newCustomers = data.kpis.new_customers || '+2 new';
          this.merchant.customersGrowth = data.kpis.customers_growth || '+25.0%';
          this.merchant.conversionRate = data.kpis.conversion_rate;
          this.merchant.conversionGrowth = data.kpis.conversion_growth || '+0.8%';
          this.merchant.avgOrderValue = data.kpis.avg_order_value;
          this.merchant.aovGrowth = data.kpis.aov_growth || '+5.2%';
          this.merchant.productsSold = data.kpis.products_sold;
          this.merchant.productsGrowth = data.kpis.products_growth || '+15.8%';
          this.merchant.dateRange = data.date_range || dateRange;
          this.merchant.dateLabel = data.date_label || 'Selected Range';
          this.merchant.lastUpdated = data.last_updated || 'Just now';

          if (data.charts) this.merchant.charts = data.charts;
          if (data.inventory_alerts) this.merchant.inventoryAlerts = data.inventory_alerts;
          if (data.ai_insights) this.merchant.aiInsights = data.ai_insights;
        }
      }
    } catch (e) {
      console.warn("Analytics fetch error:", e);
    }
    this.triggerAppUpdate();
  },

  // Export Analytics Data as a well-formatted CSV report
  exportAnalyticsCSV() {
    const k = this.merchant;
    const top = (k.charts && k.charts.top_products) || [];
    const cat = (k.charts && k.charts.category_sales) || { labels: [], values: [], percentages: [] };

    let csv = 'ShopAI Business Intelligence & Sales Analytics Report\n';
    csv += `Generated On,${new Date().toISOString()}\n`;
    csv += `Period,${k.dateLabel || 'Last 7 Days'}\n\n`;

    csv += '--- KEY PERFORMANCE INDICATORS ---\n';
    csv += 'Metric,Value,Period Change\n';
    csv += `Total Gross Revenue,"${k.revenueFormatted}",${k.revenueGrowth}\n`;
    csv += `Total Completed Orders,${k.totalOrders},${k.ordersGrowth}\n`;
    csv += `Average Order Value (AOV),"${k.avgOrderValue}",${k.aovGrowth || '+5.2%'}\n`;
    csv += `Total Registered Customers,${k.activeCustomers},${k.customersGrowth || '+25.0%'}\n`;
    csv += `Products Sold (Units),${k.productsSold},${k.productsGrowth || '+15.8%'}\n`;
    csv += `Store Conversion Rate,${k.conversionRate},${k.conversionGrowth || '+0.8%'}\n\n`;

    csv += '--- CATEGORY SALES DISTRIBUTION ---\n';
    csv += 'Category,Revenue (INR),Share of GMV\n';
    if (cat.labels && cat.labels.length > 0) {
      cat.labels.forEach((lbl, i) => {
        const val = cat.values ? (cat.values[i] || 0) : 0;
        const pct = cat.percentages ? (cat.percentages[i] || 0) : 0;
        csv += `"${lbl}",${val},${pct}%\n`;
      });
    }
    csv += '\n';

    csv += '--- TOP PERFORMING PRODUCTS ---\n';
    csv += 'Product Name,Category,Units Sold,Gross Revenue (INR),Current Stock,Status\n';
    top.forEach(p => {
      csv += `"${p.name}","${p.category || 'General'}",${p.sales || 0},${p.revenue || 0},${p.stock || 0},"${p.status || 'Active'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shopai_analytics_report_${k.dateRange || '7d'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Analytics CSV Report Downloaded Successfully!', 'success');
  },

  // API CLIENT METHODS
  async syncWithBackend() {
    try {
      // 1. Fetch Products
      const prodRes = await fetch(`${this.apiBase}/products.php`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.products && prodData.products.length > 0) {
          this.products = prodData.products;
        }
      }
    } catch (e) {}

    // Fallback to complete 28-product catalog
    if (!this.products || this.products.length === 0) {
      this.products = this.getDefaultProducts();
    }

    try {
      // 2. Fetch Analytics
      await this.fetchAnalytics('7d');
    } catch (e) {}

    try {
      // 3. Fetch User Orders History
      const ordersRes = await fetch(`${this.apiBase}/orders.php?user_id=${this.user.id}`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        if (ordersData.orders && ordersData.orders.length > 0) {
          this.orders = ordersData.orders;
        }
      }
    } catch (e) {}

    try {
      // 4. Fetch Notifications
      await this.fetchNotifications();
    } catch (e) {}

    this.recalculateAllScores();
    this.triggerAppUpdate();
  },

  async fetchNotifications() {
    try {
      const res = await fetch(`${this.apiBase}/notifications.php?user_id=${this.user.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.notifications) {
          this.notifications = data.notifications;
          this.unreadNotificationsCount = data.unread_count || 0;
        }
      }
    } catch (e) {}
  },

  async markNotificationRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.is_read = 1;
    this.unreadNotificationsCount = this.notifications.filter(n => !n.is_read).length;
    this.triggerAppUpdate();
    try {
      await fetch(`${this.apiBase}/notifications.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read', id, user_id: this.user.id })
      });
    } catch (e) {}
  },

  async markAllNotificationsRead() {
    this.notifications.forEach(n => { n.is_read = 1; });
    this.unreadNotificationsCount = 0;
    this.triggerAppUpdate();
    try {
      await fetch(`${this.apiBase}/notifications.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read', user_id: this.user.id })
      });
    } catch (e) {}
  },

  async subscribePriceAlert(productId, targetPrice) {
    try {
      await fetch(`${this.apiBase}/price_intelligence.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, user_id: this.user.id, target_price: targetPrice })
      });
    } catch (e) {}
    this.showToast(`Price drop alert set for ₹${targetPrice.toLocaleString()}!`, 'success');
    this.notifications.unshift({
      id: Date.now(),
      type: 'price_drop',
      title: 'Alert Confirmed',
      message: `Alert active for product #${productId} below ₹${targetPrice.toLocaleString()}`,
      product_id: productId,
      is_read: 0,
      created_at: 'Just now'
    });
    this.unreadNotificationsCount++;
    this.triggerAppUpdate();
  },

  // Log product view in backend for customer analytics
  async logView(productId) {
    try {
      await fetch(`${this.apiBase}/products.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view', product_id: productId, user_id: this.user.id })
      });
    } catch (e) {}

    const p = this.getProductById(productId);
    if (p) p.viewsCount = (p.viewsCount || 0) + 1;
  },

  // Shopping Cart & Calculation Logic
  addToCart(productId, quantity = 1) {
    const existingIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
    this.saveStorage();
    this.triggerAppUpdate();
  },

  updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.cart.find(it => it.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.saveStorage();
      this.triggerAppUpdate();
    }
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveStorage();
    this.triggerAppUpdate();
  },

  // Delta-based qty update used by cart UI (+1/-1 buttons)
  updateCartQty(productId, delta) {
    const item = this.cart.find(it => it.productId === productId);
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = newQty;
        this.saveStorage();
        this.triggerAppUpdate();
      }
    }
  },

  getCartDetails() {
    let subtotal = 0;
    let totalCount = 0;
    const items = [];

    this.cart.forEach(cartItem => {
      const p = this.getProductById(cartItem.productId);
      if (p) {
        const lineTotal = p.price * cartItem.quantity;
        subtotal += lineTotal;
        totalCount += cartItem.quantity;
        items.push({
          ...p,
          quantity: cartItem.quantity,
          lineTotal,
          itemTotal: lineTotal   // alias used by cart view template
        });
      }
    });

    // AI Bundle Discount calculation
    let bundleDiscount = 0;
    const hasLaptop  = items.some(i => i.category === 'Laptops & Computers');
    const hasBackpack = items.some(i => i.category === 'Bags & Accessories');
    if (hasLaptop && hasBackpack) {
      bundleDiscount = 800; // Creator tech bundle savings
    }

    // Bundle upsell suggestion (shown in cart when eligible)
    let bundleSuggestion = null;
    if (hasLaptop && !hasBackpack) {
      bundleSuggestion = {
        title: '✦ AI Bundle Suggestion',
        text: 'Add a Laptop Backpack and save ₹800 instantly!',
        savings: 800,
        actionAddId: 19,
        applied: false
      };
    } else if (hasLaptop && hasBackpack) {
      bundleSuggestion = {
        title: 'AI Bundle Applied',
        text: 'Creator Tech Bundle: ₹800 discount applied.',
        savings: 800,
        actionAddId: null,
        applied: true
      };
    }

    const delivery = subtotal > 1500 ? 0 : 99;
    const total = Math.max(0, subtotal - bundleDiscount + delivery);

    return {
      items,
      count: totalCount,
      subtotal,
      bundleDiscount,
      bundleSuggestion,
      delivery,
      total
    };
  },

  // Wishlist actions
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast("Removed from Wishlist", "info");
    } else {
      this.wishlist.push(productId);
      this.showToast("Saved to Wishlist", "success");
    }
    this.saveStorage();
    this.triggerAppUpdate();
  },

  // Comparison actions
  toggleCompare(productId) {
    const index = this.compareList.indexOf(productId);
    if (index > -1) {
      this.compareList.splice(index, 1);
      this.showToast("Removed from Comparison", "info");
    } else {
      if (this.compareList.length >= 4) {
        this.showToast("Maximum 4 products can be compared simultaneously.", "warning");
        return;
      }
      this.compareList.push(productId);
      this.showToast("Added to Comparison", "success");
    }
    this.saveStorage();
    this.triggerAppUpdate();
  },

  getProductById(id) {
    const numericId = parseInt(id);
    return this.products.find(p => p.id === numericId) || this.getDefaultProducts().find(p => p.id === numericId);
  },

  // Lightweight UI Toast System
  showToast(message, type = 'info') {
    const id = Date.now();
    this.toasts.push({ id, message, type });
    this.renderToasts();
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.renderToasts();
    }, 3200);
  },

  renderToasts() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;top:24px;right:24px;z-index:999999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    container.innerHTML = this.toasts.map(t => {
      let icon = '✦';
      let borderColor = 'rgba(0, 242, 254, 0.4)';
      if (t.type === 'success') { icon = '✓'; borderColor = '#10b981'; }
      if (t.type === 'warning') { icon = '⚠'; borderColor = '#f59e0b'; }
      if (t.type === 'error') { icon = '✕'; borderColor = '#f43f5e'; }

      return `
        <div style="background:rgba(13,19,32,0.96);backdrop-filter:blur(16px);border:1px solid ${borderColor};border-radius:12px;padding:12px 18px;color:#fff;font-size:0.88rem;box-shadow:0 12px 30px rgba(0,0,0,0.6);display:flex;align-items:center;gap:10px;pointer-events:auto;animation:fadeIn 0.25s ease;">
          <span style="color:${borderColor};font-weight:bold;">${icon}</span>
          <span>${t.message}</span>
        </div>
      `;
    }).join('');
  },

  subscribers: [],
  subscribe(fn) {
    this.subscribers.push(fn);
  },
  triggerAppUpdate() {
    this.subscribers.forEach(fn => fn());
  },

  // Comprehensive 28-Product Catalog Across 7 Real Categories
  getDefaultProducts() {
    return [
  {
    "id": 1,
    "name": "Apex Pro ANC Wireless Headphones",
    "category": "Electronics",
    "price": 4999,
    "originalPrice": 7999,
    "rating": 4.8,
    "reviewsCount": 482,
    "stock": 38,
    "stockStatus": "In Stock",
    "viewsCount": 420,
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "description": "Adaptive hybrid noise cancellation with 3D spatial audio, 40-hour battery life, and plush memory foam earcups.",
    "features": [
      "40dB Hybrid Active Noise Cancellation",
      "40-Hour Battery with Fast Charge",
      "Ultra-Low Latency Bluetooth 5.3",
      "Custom EQ App Support"
    ],
    "specs": {
      "Driver": "40mm Bio-Cellulose",
      "Battery": "40 Hours (ANC On)",
      "Weight": "245g",
      "Connectivity": "Bluetooth 5.3 + 3.5mm Aux"
    },
    "tags": "wireless audio headphones bluetooth anc music sound over-ear",
    "aiScore": 96,
    "aiReason": "Top-rated acoustic performance with high 40dB noise cancellation under ₹5,000.",
    "pros": [
      "Deep immersive bass & crisp highs",
      "Ultra comfortable for 8+ hour work sessions",
      "Multipoint device pairing"
    ],
    "cons": [
      "Carrying case is slightly large"
    ],
    "bestUseCase": "Deep focus coding, travel, and daily commuting"
  },
  {
    "id": 2,
    "name": "PulseWave Pro True Wireless Earbuds",
    "category": "Electronics",
    "price": 2499,
    "originalPrice": 3999,
    "rating": 4.7,
    "reviewsCount": 310,
    "stock": 52,
    "stockStatus": "In Stock",
    "viewsCount": 390,
    "imageUrl": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    "description": "Compact IPX5 waterproof wireless earbuds featuring 10mm titanium dynamic drivers and crystal-clear 4-mic ENC calls.",
    "features": [
      "10mm Titanium Drivers",
      "32-Hour Total Playtime",
      "IPX5 Sweat & Water Resistant",
      "Dual-Mic Environmental Noise Cancellation"
    ],
    "specs": {
      "Driver": "10mm Titanium",
      "Playtime": "8h Earbuds + 24h Case",
      "Charging": "USB-C Fast Charge",
      "Weight": "4.2g per earbud"
    },
    "tags": "earbuds wireless tws bluetooth audio mic bass earphones",
    "aiScore": 93,
    "aiReason": "Exceptional value under ₹3,000 with punchy bass and reliable IPX5 water resistance.",
    "pros": [
      "Pocket-sized charging case",
      "Secure ergonomic fit for running",
      "Instant auto-connect on open"
    ],
    "cons": [
      "Touch controls take a day to get used to"
    ],
    "bestUseCase": "Gym workouts, running, and hands-free calls"
  },
  {
    "id": 3,
    "name": "SoundCore Cinema 2.1 Spatial Soundbar",
    "category": "Electronics",
    "price": 8999,
    "originalPrice": 12999,
    "rating": 4.8,
    "reviewsCount": 165,
    "stock": 24,
    "stockStatus": "In Stock",
    "viewsCount": 280,
    "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    "description": "160W cinema soundbar with dedicated wireless subwoofer, Dolby Atmos decoding, and HDMI eARC connectivity.",
    "features": [
      "160W Peak Audio Power",
      "Wireless 6.5-inch Subwoofer",
      "HDMI eARC + Optical + Bluetooth",
      "Dialogue Clarity Enhancement"
    ],
    "specs": {
      "Power": "160W RMS",
      "Channels": "2.1 Virtual Spatial",
      "Subwoofer": "Wireless 6.5-inch Down-firing",
      "Inputs": "HDMI eARC, Optical, AUX, BT 5.2"
    },
    "tags": "soundbar speaker tv home theater dolby audio bluetooth sound",
    "aiScore": 94,
    "aiReason": "Cinema-grade 160W output with wireless subwoofer for immersive home entertainment.",
    "pros": [
      "Room-filling cinematic bass",
      "Clear speech isolation for movies",
      "Slim profile fits under any TV"
    ],
    "cons": [
      "Requires separate power for wireless subwoofer"
    ],
    "bestUseCase": "Living room movies, gaming, and television audio upgrade"
  },
  {
    "id": 4,
    "name": "AuraStudio Hi-Res Desktop DAC & Monitor Speakers",
    "category": "Electronics",
    "price": 12499,
    "originalPrice": 16999,
    "rating": 4.9,
    "reviewsCount": 128,
    "stock": 15,
    "stockStatus": "Low Stock",
    "viewsCount": 310,
    "imageUrl": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
    "description": "Audiophile reference desktop studio monitors with built-in 24-bit/192kHz USB DAC and Kevlar woofer cones.",
    "features": [
      "Built-in 24-bit/192kHz Audiophile DAC",
      "Woven Kevlar Woofers",
      "Acoustic Room Tuning Switches",
      "Dual Analog & Optical Inputs"
    ],
    "specs": {
      "Frequency": "48Hz - 22kHz",
      "Amplification": "Class-D Bi-amped 70W",
      "Inputs": "USB Type-C, RCA, 3.5mm Aux",
      "Finish": "Matte Dark Carbon"
    },
    "tags": "speakers desktop studio monitor dac audiophile music production audio",
    "aiScore": 97,
    "aiReason": "Flat frequency response and studio-grade DAC precision for audio purists and music creators.",
    "pros": [
      "Ultra-clean distortion-free sound",
      "Direct USB-C plug-and-play with Mac & PC",
      "Solid MDF acoustic enclosure"
    ],
    "cons": [
      "No wireless Bluetooth to preserve lossless audio"
    ],
    "bestUseCase": "Music production, desk setup audio, and lossless listening"
  },
  {
    "id": 5,
    "name": "NomadGo Rugged 360 Waterproof Bluetooth Speaker",
    "category": "Electronics",
    "price": 3499,
    "originalPrice": 4999,
    "rating": 4.7,
    "reviewsCount": 220,
    "stock": 40,
    "stockStatus": "In Stock",
    "viewsCount": 260,
    "imageUrl": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    "description": "IPX7 fully submersible waterproof outdoor speaker with 360-degree omnidirectional sound and 16-hour battery.",
    "features": [
      "IPX7 Waterproof & Floats in Water",
      "360-Degree Omnidirectional Sound",
      "16-Hour Battery Life",
      "Built-in Carabiner Strap"
    ],
    "specs": {
      "Power": "20W Peak",
      "Battery": "16 Hours",
      "Protection": "IPX7 Submersible",
      "Weight": "480g"
    },
    "tags": "speaker bluetooth outdoor portable waterproof camping audio travel",
    "aiScore": 92,
    "aiReason": "Durable all-weather outdoor speaker that literally floats in water.",
    "pros": [
      "Extremely durable drop-resistant build",
      "Floats on water surface",
      "Loud, punchy 360 audio"
    ],
    "cons": [
      "Slightly heavier than pocket speakers"
    ],
    "bestUseCase": "Pool parties, camping trips, and beach outings"
  },
  {
    "id": 6,
    "name": "Zenith UltraSlim 15 Carbon Laptop",
    "category": "Laptops & Computers",
    "price": 58999,
    "originalPrice": 69999,
    "rating": 4.7,
    "reviewsCount": 195,
    "stock": 14,
    "stockStatus": "Low Stock",
    "viewsCount": 590,
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    "description": "13th Gen Intel Core i7, 16GB LPDDR5, 512GB NVMe SSD, and 2.8K OLED 120Hz display with aluminum unibody build.",
    "features": [
      "Intel Core i7-1360P 12-Core Processor",
      "16GB RAM + 512GB Gen4 NVMe SSD",
      "15.6-inch 2.8K OLED 120Hz Display",
      "1.18kg Featherlight Aluminum Frame"
    ],
    "specs": {
      "Processor": "Intel Core i7-1360P",
      "Memory": "16GB LPDDR5 6000MHz",
      "Storage": "512GB PCIe 4.0 SSD",
      "Display": "15.6\" 2.8K OLED (2880x1800)",
      "Weight": "1.18kg"
    },
    "tags": "laptop computer programming ultrabook coding intel oled developer notebook",
    "aiScore": 95,
    "aiReason": "Best value-for-money developer laptop under ₹60,000 with 16GB RAM and OLED screen.",
    "pros": [
      "Vibrant OLED panel reduces eye strain",
      "Fast compilation for code & ML models",
      "Under 1.2kg ultra-portable build"
    ],
    "cons": [
      "RAM is soldered on-board"
    ],
    "bestUseCase": "Software development, college studies, and creative multitasking"
  },
  {
    "id": 7,
    "name": "SwiftBook Air 14 M2 Edition",
    "category": "Laptops & Computers",
    "price": 74999,
    "originalPrice": 89999,
    "rating": 4.9,
    "reviewsCount": 340,
    "stock": 20,
    "stockStatus": "In Stock",
    "viewsCount": 620,
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    "description": "Next-generation 8-core CPU, 10-core GPU, 16GB unified memory, Liquid Retina display, and 18-hour all-day battery life.",
    "features": [
      "M2 Ultra-Efficient 8-Core Processor",
      "18-Hour All-Day Real Battery",
      "Liquid Retina True Tone Display",
      "Silent Fanless Zero-Noise Cooling"
    ],
    "specs": {
      "Chip": "8-Core CPU / 10-Core GPU",
      "RAM": "16GB Unified Memory",
      "SSD": "512GB Fast SSD",
      "Battery": "Up to 18 Hours",
      "Weight": "1.24kg"
    },
    "tags": "laptop macbook ultrabook slim lightweight battery programmer developer designer",
    "aiScore": 98,
    "aiReason": "Unmatched 18-hour battery endurance and silent fanless operation for all-day mobility.",
    "pros": [
      "Class-leading 18-hour battery longevity",
      "Completely silent fanless design",
      "Bright 500-nit Liquid Retina screen"
    ],
    "cons": [
      "Limited to 2 USB-C ports"
    ],
    "bestUseCase": "Professional work, mobile productivity, and daily university lectures"
  },
  {
    "id": 8,
    "name": "Helios Pro 16 Gaming & ML Workstation",
    "category": "Laptops & Computers",
    "price": 84999,
    "originalPrice": 99999,
    "rating": 4.8,
    "reviewsCount": 142,
    "stock": 12,
    "stockStatus": "Low Stock",
    "viewsCount": 480,
    "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    "description": "AMD Ryzen 7 7840HS, NVIDIA RTX 4060 8GB GDDR6, 16GB DDR5, 1TB Gen4 SSD, and 165Hz QHD G-Sync IPS panel.",
    "features": [
      "AMD Ryzen 7 7840HS 8-Core / 16-Thread",
      "NVIDIA GeForce RTX 4060 8GB GPU",
      "165Hz QHD IPS Display",
      "Vapor Chamber Dual-Fan Cooling"
    ],
    "specs": {
      "CPU": "AMD Ryzen 7 7840HS",
      "GPU": "NVIDIA RTX 4060 (115W TGP)",
      "RAM": "16GB DDR5 (Expandable to 64GB)",
      "Storage": "1TB NVMe SSD",
      "Display": "16\" QHD (2560x1600) 165Hz"
    },
    "tags": "laptop gaming nvidia rtx machine learning ai workstation ryzen performance",
    "aiScore": 94,
    "aiReason": "Dedicated RTX 4060 8GB GPU for heavy local Machine Learning training and 1440p gaming.",
    "pros": [
      "Powerful CUDA GPU for ML & video rendering",
      "Expandable dual RAM & SSD slots",
      "165Hz butter-smooth high refresh rate"
    ],
    "cons": [
      "Power adapter is heavy (230W brick)"
    ],
    "bestUseCase": "AI model training, 3D rendering, and AAA high-FPS gaming"
  },
  {
    "id": 9,
    "name": "NovaPad Pro 11 2-in-1 OLED Convertible",
    "category": "Laptops & Computers",
    "price": 42999,
    "originalPrice": 52999,
    "rating": 4.6,
    "reviewsCount": 188,
    "stock": 28,
    "stockStatus": "In Stock",
    "viewsCount": 350,
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    "description": "Versatile 2-in-1 detachable OLED laptop with precision stylus support, Intel Core i5 processor, and all-day battery.",
    "features": [
      "11-inch 2.5K OLED Touchscreen",
      "Detachable Magnetic Keyboard Included",
      "Stylus Pen with 4096 Pressure Levels",
      "Fast USB-C PD Charging"
    ],
    "specs": {
      "Processor": "Intel Core i5-1235U 10-Cores",
      "RAM": "16GB LPDDR5",
      "Storage": "256GB SSD",
      "Weight": "780g (Tablet) / 1.1kg (with Keyboard)"
    },
    "tags": "tablet 2-in-1 convertible stylus touch laptop oled student portable",
    "aiScore": 91,
    "aiReason": "Lightweight 2-in-1 convertible with included stylus pen for note-taking and sketching.",
    "pros": [
      "OLED screen with vibrant deep blacks",
      "Includes keyboard and pressure stylus in box",
      "Weighs only 780g"
    ],
    "cons": [
      "256GB storage (expandable via MicroSD)"
    ],
    "bestUseCase": "Digital note-taking, sketching, media consumption, and casual travel"
  },
  {
    "id": 10,
    "name": "UltraView 27-inch 4K HDR USB-C Monitor",
    "category": "Laptops & Computers",
    "price": 24999,
    "originalPrice": 32999,
    "rating": 4.8,
    "reviewsCount": 175,
    "stock": 22,
    "stockStatus": "In Stock",
    "viewsCount": 410,
    "imageUrl": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    "description": "27-inch 4K UHD IPS professional monitor with 99% sRGB, HDR400, height-adjustable stand, and 65W USB-C single cable docking.",
    "features": [
      "3840x2160 4K UHD IPS Panel",
      "65W USB-C Laptop Power Delivery",
      "Fully Ergonomic Height/Pivot Stand",
      "Eye Care Flicker-Free Technology"
    ],
    "specs": {
      "Resolution": "3840 x 2160 (4K)",
      "Panel": "IPS 178° View",
      "Refresh": "60Hz",
      "Ports": "USB-C (65W PD), 2x HDMI 2.0, DP 1.4, USB Hub"
    },
    "tags": "monitor screen 4k display usb-c ips computer setup developer designer",
    "aiScore": 96,
    "aiReason": "Single USB-C cable charges your laptop and sends 4K video simultaneously.",
    "pros": [
      "Razor-sharp 4K text readability for code",
      "65W USB-C one-cable docking",
      "Pivot to vertical mode for viewing long code files"
    ],
    "cons": [
      "60Hz refresh rate (not designed for competitive gaming)"
    ],
    "bestUseCase": "Coding, programming, photo editing, and clean desk cable management"
  },
  {
    "id": 11,
    "name": "TerraGuard Alpha Waterproof Trekking Jacket",
    "category": "Outdoor Gear",
    "price": 6499,
    "originalPrice": 9999,
    "rating": 4.9,
    "reviewsCount": 214,
    "stock": 22,
    "stockStatus": "Low Stock",
    "viewsCount": 380,
    "imageUrl": "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80",
    "description": "3-layer breathable Gore-Shield membrane, 20,000mm hydrostatic head waterproof rating, taped seams, and underarm pit zips.",
    "features": [
      "20,000mm Waterproof Membrane",
      "Windproof & Breathable 3-Layer Shell",
      "YKK AquaGuard Waterproof Zippers",
      "Packable into Internal Pocket"
    ],
    "specs": {
      "Waterproofing": "20,000mm hydrostatic head",
      "Breathability": "15,000 g/m²/24h",
      "Material": "3-Layer Recycled Cordura",
      "Weight": "410g"
    },
    "tags": "jacket waterproof trekking outdoor rain hiking weather winter alpine",
    "aiScore": 94,
    "aiReason": "Heavy-duty 20,000mm waterproof rating with underarm aeration zips for high-altitude trekking.",
    "pros": [
      "100% waterproof in downpours",
      "Pit-zips vent heat without letting rain in",
      "Reinforced shoulders for heavy backpacks"
    ],
    "cons": [
      "Shell crinkles slightly in sub-zero frost"
    ],
    "bestUseCase": "Himalayan expeditions, monsoon trekking, and harsh rain weather"
  },
  {
    "id": 12,
    "name": "SummitVenture Alpine Ultralight Windbreaker",
    "category": "Outdoor Gear",
    "price": 3499,
    "originalPrice": 4999,
    "rating": 4.7,
    "reviewsCount": 160,
    "stock": 35,
    "stockStatus": "In Stock",
    "viewsCount": 290,
    "imageUrl": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    "description": "Featherlight 180g ripstop windbreaker with DWR water repellent coating, elasticated storm hood, and reflective safety strips.",
    "features": [
      "Weighs only 180 grams",
      "DWR Water-Repellent Coating",
      "Packs into Pocket-sized Pouch",
      "360-Degree Reflective Trims"
    ],
    "specs": {
      "Fabric": "20D Ripstop Nylon",
      "Weight": "180g",
      "Windproof": "Up to 50km/h winds",
      "PackSize": "Fits in palm"
    },
    "tags": "windbreaker jacket lightweight running hiking outdoor wind rain",
    "aiScore": 92,
    "aiReason": "Featherweight 180g packable windbreaker that blocks mountain chill completely.",
    "pros": [
      "Virtually weightless in a backpack",
      "Excellent wind blocking",
      "Quick-drying fabric"
    ],
    "cons": [
      "Resistant to light showers, not meant for monsoon downpours"
    ],
    "bestUseCase": "Trail running, morning cycling, and windy hilltop hikes"
  },
  {
    "id": 13,
    "name": "TrailBlaze All-Weather 4-Season Camping Tent",
    "category": "Outdoor Gear",
    "price": 7899,
    "originalPrice": 10999,
    "rating": 4.8,
    "reviewsCount": 94,
    "stock": 18,
    "stockStatus": "In Stock",
    "viewsCount": 210,
    "imageUrl": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    "description": "2-person double-layer camping tent with lightweight aluminum poles, 3000mm waterproof rainfly, and dual vestibules.",
    "features": [
      "Double-Layer Condensation-Free Design",
      "Aerospace 7001 Aluminum Poles",
      "Quick 3-Minute Setup",
      "Dual Entry Doors with Bug Mesh"
    ],
    "specs": {
      "Capacity": "2 Person",
      "Weight": "2.1kg Complete",
      "WaterproofRating": "3000mm PU Coated",
      "Floor": "210T Waterproof Oxford"
    },
    "tags": "tent camping outdoor trekking 2-person waterproof hiking gear shelter",
    "aiScore": 93,
    "aiReason": "Rugged double-wall 2-person tent with aerospace aluminum poles weighing only 2.1kg.",
    "pros": [
      "Sturdy in high winds",
      "Fast 3-minute setup",
      "Separate bug-free inner mesh layer"
    ],
    "cons": [
      "Snug fit for two people with very large packs"
    ],
    "bestUseCase": "Weekend wilderness camping, backpacking, and trekking camps"
  },
  {
    "id": 14,
    "name": "AlpineGrip Carbon Trekking Poles (Pair)",
    "category": "Outdoor Gear",
    "price": 1899,
    "originalPrice": 2799,
    "rating": 4.7,
    "reviewsCount": 130,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 180,
    "imageUrl": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80",
    "description": "Ultralight carbon composite hiking poles with quick flip-lock adjustment, natural cork moisture-wicking grips, and tungsten carbide tips.",
    "features": [
      "100% Carbon Fiber Shafts",
      "Natural Ergonomic Cork Grips",
      "Quick-Lock Lever System",
      "Includes Mud & Snow Baskets"
    ],
    "specs": {
      "Material": "Carbon Composite",
      "Weight": "210g per pole",
      "ExtendedLength": "135cm",
      "CollapsedLength": "62cm"
    },
    "tags": "trekking poles hiking sticks carbon fiber walking outdoor gear",
    "aiScore": 90,
    "aiReason": "Reduces knee strain by 30% on descents with ultralight 210g carbon fiber shafts.",
    "pros": [
      "Natural cork handles absorb sweat",
      "Reliable metal flip locks",
      "Tungsten tips grip rock securely"
    ],
    "cons": [
      "Slightly less flexible than aluminum on heavy side impacts"
    ],
    "bestUseCase": "Mountain ascents, downhill knee protection, and rough rocky trails"
  },
  {
    "id": 15,
    "name": "AeroStride Quantum Running Shoes",
    "category": "Footwear",
    "price": 3899,
    "originalPrice": 5999,
    "rating": 4.8,
    "reviewsCount": 312,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 450,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "description": "Supercritical nitrogen-infused foam midsole, engineered breathable jacquard mesh, and high-abrasion rubber outsole.",
    "features": [
      "Nitrogen-Infused Energy Foam Midsole",
      "Breathable Engineered Jacquard Mesh",
      "Anti-Pronation Arch Cradle",
      "Durable Continental Rubber Grip"
    ],
    "specs": {
      "Midsole": "Nitrogen Foam (78% Energy Return)",
      "Drop": "8mm",
      "Weight": "220g (Size 9)",
      "Sole": "High-Abrasion Rubber"
    },
    "tags": "shoes running sneakers footwear sports athletic marathon training",
    "aiScore": 95,
    "aiReason": "Responsive nitrogen foam midsole offers high 78% energy return under ₹4,000.",
    "pros": [
      "Cushioned yet springy bounce",
      "Breathable mesh prevents hot feet",
      "Zero blister break-in period"
    ],
    "cons": [
      "Bright red colorway stands out prominently"
    ],
    "bestUseCase": "Daily road running, 5K/10K training, and gym cardio"
  },
  {
    "id": 16,
    "name": "Velocity Pro Carbon Marathon Racers",
    "category": "Footwear",
    "price": 5499,
    "originalPrice": 7999,
    "rating": 4.9,
    "reviewsCount": 140,
    "stock": 20,
    "stockStatus": "In Stock",
    "viewsCount": 320,
    "imageUrl": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    "description": "Elite marathon racing shoes with full-length curved carbon fiber propulsion plate and dual-density supercritical foam.",
    "features": [
      "Full-Length Carbon Fiber Plate",
      "Ultra-Lightweight Mono-Mesh Upper",
      "Propulsive Rocker Geometry",
      "Weight only 195g"
    ],
    "specs": {
      "Plate": "Curved Carbon Fiber",
      "Weight": "195g",
      "Drop": "6mm",
      "Use": "Race Day Speed"
    },
    "tags": "shoes racing carbon plate marathon speed runner sneakers footwear",
    "aiScore": 97,
    "aiReason": "Full-length carbon plate geometry propels you forward with every stride on race day.",
    "pros": [
      "Noticeable speed propulsion forward",
      "Featherlight 195g weight",
      "Maximum energy conservation on long runs"
    ],
    "cons": [
      "Stiffer plate feel when walking slowly"
    ],
    "bestUseCase": "Half-marathon and full-marathon race days and tempo sessions"
  },
  {
    "id": 17,
    "name": "CloudWalk Minimalist Urban Daily Sneakers",
    "category": "Footwear",
    "price": 2799,
    "originalPrice": 3999,
    "rating": 4.7,
    "reviewsCount": 280,
    "stock": 50,
    "stockStatus": "In Stock",
    "viewsCount": 360,
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    "description": "Versatile low-top minimalist casual sneakers featuring memory foam insoles, clean vegan leather uppers, and non-slip rubber cupsoles.",
    "features": [
      "Clean Minimalist Silhouette",
      "Memory Foam Ortho Cushion Insole",
      "Water-Resistant Vegan Leather",
      "Padded Collar & Tongue"
    ],
    "specs": {
      "Upper": "Smooth Vegan Leather",
      "Insole": "Dual-Density Memory Foam",
      "Outsole": "Non-Marking Rubber",
      "Closure": "Lace-up"
    },
    "tags": "sneakers shoes casual minimalist white low-top daily lifestyle",
    "aiScore": 92,
    "aiReason": "Timeless minimalist sneaker silhouette that pairs effortlessly with jeans, chinos, and shorts.",
    "pros": [
      "Extremely versatile aesthetic",
      "Easy to wipe clean with a cloth",
      "Memory foam prevents heel fatigue"
    ],
    "cons": [
      "Runs half a size small for wide feet"
    ],
    "bestUseCase": "Everyday college wear, office casual, and city walking"
  },
  {
    "id": 18,
    "name": "TerraClimb Vibram Waterproof Hiking Boots",
    "category": "Footwear",
    "price": 6199,
    "originalPrice": 8499,
    "rating": 4.8,
    "reviewsCount": 160,
    "stock": 18,
    "stockStatus": "Low Stock",
    "viewsCount": 270,
    "imageUrl": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    "description": "Mid-cut waterproof trekking boots with genuine Vibram Megagrip lugged outsoles and reinforced rubber toe caps.",
    "features": [
      "Vibram Megagrip Mud-Clearing Sole",
      "Hydro-Tex 100% Waterproof Bootie",
      "High-Ankle Support & Stability Shank",
      "Protective Rubber Toe Bumper"
    ],
    "specs": {
      "Outsole": "Vibram Megagrip 5mm Lugs",
      "Membrane": "Hydro-Tex Waterproof",
      "Ankle": "Mid-Cut Padded Support",
      "Weight": "490g per boot"
    },
    "tags": "boots hiking trekking footwear vibram waterproof outdoor shoes trail",
    "aiScore": 94,
    "aiReason": "Vibram Megagrip rubber lugs prevent slippage on wet rocks and steep mud slopes.",
    "pros": [
      "Bulletproof grip on wet rock and mud",
      "Solid ankle rollover protection",
      "100% dry feet through river crossings"
    ],
    "cons": [
      "Requires 2-3 short walks to fully break in"
    ],
    "bestUseCase": "Monsoon treks, rocky scrambles, and multiday backpacking"
  },
  {
    "id": 19,
    "name": "Nordic Minimalist Waterproof Laptop Backpack",
    "category": "Bags & Accessories",
    "price": 2499,
    "originalPrice": 3999,
    "rating": 4.8,
    "reviewsCount": 260,
    "stock": 60,
    "stockStatus": "In Stock",
    "viewsCount": 710,
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    "description": "Weather-resistant matte polyurethane fabric, suspended 16-inch fleece laptop sleeve, hidden anti-theft passport pocket, and luggage strap.",
    "features": [
      "Matte Water-Repellent Outer Shield",
      "Suspended 16-inch Fleece Laptop Compartment",
      "Hidden Anti-Theft Backrest Pocket",
      "Luggage Trolley Pass-Through"
    ],
    "specs": {
      "Volume": "22 Liters",
      "LaptopFit": "Up to 16-inch MacBook / Laptop",
      "Dimensions": "45 x 30 x 14 cm",
      "Material": "Waterproof Polyurethane & 900D Oxford"
    },
    "tags": "bag backpack laptop waterproof minimalist accessories commute travel",
    "aiScore": 96,
    "aiReason": "Matte waterproof exterior and padded suspended sleeve safeguard your laptop completely.",
    "pros": [
      "Sleek modern boxy aesthetic",
      "Suspended sleeve protects laptop from bottom drops",
      "Hidden passport pocket on back"
    ],
    "cons": [
      "Side bottle pocket fits up to 750ml bottles"
    ],
    "bestUseCase": "Daily office commute, college, and domestic flights"
  },
  {
    "id": 20,
    "name": "AeroSling Urban Tech Crossbody Pack",
    "category": "Bags & Accessories",
    "price": 1499,
    "originalPrice": 2299,
    "rating": 4.7,
    "reviewsCount": 190,
    "stock": 42,
    "stockStatus": "In Stock",
    "viewsCount": 340,
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    "description": "Compact 4.5L weather-resistant sling bag with magnetic quick-release buckle, internal tablet sleeve, and key leash.",
    "features": [
      "Fidlock-Style Magnetic Quick-Release Buckle",
      "Fits 11-inch iPad / Tablet",
      "Water-Repellent YKK Zips",
      "Padded Breathable Mesh Back"
    ],
    "specs": {
      "Capacity": "4.5 Liters",
      "Weight": "320g",
      "Material": "Cordura Ballistic Nylon",
      "Strap": "Reversible Left/Right Shoulder"
    },
    "tags": "sling bag crossbody tech pack urban accessories pouch travel",
    "aiScore": 91,
    "aiReason": "Hands-free compact carry for phone, tablet, power bank, and sunglasses.",
    "pros": [
      "Magnetic buckle snaps shut effortlessly",
      "Lightweight and hugs the body",
      "Fits an 11-inch tablet safely"
    ],
    "cons": [
      "Cannot fit standard 13-inch laptops"
    ],
    "bestUseCase": "Weekend outings, quick errands, and airport security checks"
  },
  {
    "id": 21,
    "name": "Voyager 45L Water-Resistant Expandable Travel Duffel",
    "category": "Bags & Accessories",
    "price": 3799,
    "originalPrice": 5499,
    "rating": 4.8,
    "reviewsCount": 110,
    "stock": 25,
    "stockStatus": "In Stock",
    "viewsCount": 220,
    "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    "description": "Airline carry-on approved 45L duffel with stowable backpack shoulder straps, dedicated ventilated shoe compartment, and wet pouch.",
    "features": [
      "Converts from Duffel to Backpack",
      "Separate Ventilated Shoe Tunnel",
      "Airline Carry-On Approved Dimensions",
      "Heavy-Duty 1000D Tarpaulin"
    ],
    "specs": {
      "Volume": "45 Liters (Expandable to 50L)",
      "Weight": "1.2kg",
      "Material": "Water-Resistant 1000D Tarpaulin",
      "CarryWays": "Duffel / Backpack / Shoulder"
    },
    "tags": "duffel bag travel gym backpack luggage weekender accessories",
    "aiScore": 94,
    "aiReason": "Converts seamlessly from a gym duffel into a backpack with dedicated shoe compartment.",
    "pros": [
      "Rugged weatherproof tarpaulin",
      "Shoe pocket keeps dirty soles away from clean clothes",
      "Fits airline overhead cabins"
    ],
    "cons": [
      "Structured material doesn't compress down when half empty"
    ],
    "bestUseCase": "Weekend travel trips, gym gear, and 3-5 day business tours"
  },
  {
    "id": 22,
    "name": "ModuCase Magnetic Tech Organizer & Cable Pouch",
    "category": "Bags & Accessories",
    "price": 999,
    "originalPrice": 1599,
    "rating": 4.6,
    "reviewsCount": 240,
    "stock": 75,
    "stockStatus": "In Stock",
    "viewsCount": 280,
    "imageUrl": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    "description": "Origami-style fold-out electronics accessory organizer with elastic cable loops, mesh zip pockets, and water-repellent shell.",
    "features": [
      "Accordion Origami Fold-Out Opening",
      "12 Elastic Cable Retention Loops",
      "Dedicated Power Bank & Mouse Pocket",
      "Water-Repellent Melange Fabric"
    ],
    "specs": {
      "Dimensions": "24 x 13 x 8 cm",
      "Pockets": "8 Compartments",
      "Material": "Water-Repellent 600D Polyester",
      "Weight": "180g"
    },
    "tags": "organizer pouch cables charger accessories tech bag",
    "aiScore": 89,
    "aiReason": "Stops cable tangles and keeps chargers, adapters, and mice organized in one pouch.",
    "pros": [
      "Opens wide like an accordion on your desk",
      "Keeps charging cables untangled",
      "Sturdy protective padding"
    ],
    "cons": [
      "Very large laptop power bricks may take up two slots"
    ],
    "bestUseCase": "Organizing tech accessories, chargers, and flash drives in your bag"
  },
  {
    "id": 23,
    "name": "PulseSync Titanium AMOLED Smartwatch",
    "category": "Wearables",
    "price": 5999,
    "originalPrice": 8999,
    "rating": 4.8,
    "reviewsCount": 285,
    "stock": 30,
    "stockStatus": "In Stock",
    "viewsCount": 410,
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    "description": "Aerospace titanium bezel, 1.43-inch 1000-nit AMOLED display, Bluetooth calling with speaker, continuous SpO2, and 12-day battery life.",
    "features": [
      "1.43-inch Always-On AMOLED 1000 Nits",
      "Aerospace Titanium Alloy Case",
      "12-Day Battery Life on Single Charge",
      "Bluetooth Phone Calls with Mic & Speaker"
    ],
    "specs": {
      "Screen": "1.43\" AMOLED (466x466)",
      "Battery": "410mAh (12 Days Normal Use)",
      "WaterResistance": "5ATM (50 meters)",
      "Sensors": "Heart Rate, SpO2, Sleep, Stress"
    },
    "tags": "smartwatch watch fitness wearable health amoled heart rate titanium",
    "aiScore": 96,
    "aiReason": "Premium aerospace titanium construction and 12-day battery life under ₹6,000.",
    "pros": [
      "Stunning bright 1000-nit screen under direct sunlight",
      "Real 12-day battery life",
      "Clear Bluetooth calling audio"
    ],
    "cons": [
      "Third-party app store selection is basic"
    ],
    "bestUseCase": "Daily fitness tracking, phone call notifications, and business casual style"
  },
  {
    "id": 24,
    "name": "AuraFit Pro AMOLED Health & Sleep Tracker Band",
    "category": "Wearables",
    "price": 2699,
    "originalPrice": 3999,
    "rating": 4.7,
    "reviewsCount": 390,
    "stock": 55,
    "stockStatus": "In Stock",
    "viewsCount": 340,
    "imageUrl": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80",
    "description": "Ultra-slim 24g fitness band with curved AMOLED display, continuous heart rate and sleep REM monitoring, and 14-day battery.",
    "features": [
      "Weighs only 24 grams",
      "1.47-inch Curved AMOLED Color Screen",
      "Advanced REM Sleep & Stress Tracking",
      "14-Day Battery Endurance"
    ],
    "specs": {
      "Display": "1.47\" AMOLED",
      "Weight": "24g with strap",
      "WaterRating": "5ATM Waterproof",
      "Battery": "Up to 14 Days"
    },
    "tags": "fitness band tracker watch wearable sleep heart health lightweight",
    "aiScore": 93,
    "aiReason": "Featherlight 24g band you can wear comfortably to sleep every night.",
    "pros": [
      "So light you forget you are wearing it",
      "Detailed REM sleep stages and recovery score",
      "Two weeks without charging"
    ],
    "cons": [
      "No built-in GPS (uses phone GPS for map routes)"
    ],
    "bestUseCase": "Sleep monitoring, daily step counting, and discreet health tracking"
  },
  {
    "id": 25,
    "name": "Chronos Elite Sapphire GPS Multi-Sport Watch",
    "category": "Wearables",
    "price": 14999,
    "originalPrice": 19999,
    "rating": 4.9,
    "reviewsCount": 95,
    "stock": 10,
    "stockStatus": "Low Stock",
    "viewsCount": 260,
    "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    "description": "Rugged expedition watch with scratchproof sapphire crystal, dual-frequency multi-GNSS GPS tracking, barometric altimeter, and offline maps.",
    "features": [
      "Scratchproof Sapphire Crystal Lens",
      "Dual-Frequency Precision GNSS GPS",
      "Offline Topo Maps Navigation",
      "Barometric Altimeter & Compass"
    ],
    "specs": {
      "Glass": "Sapphire Crystal",
      "Bezel": "Grade 5 Titanium",
      "Battery": "21 Days (60h Full GPS)",
      "Waterproof": "10ATM (100 meters)"
    },
    "tags": "smartwatch gps multisport running trail sapphire premium watch athlete",
    "aiScore": 98,
    "aiReason": "Sapphire crystal and dual-frequency GPS for uncompromising endurance athletes and mountain hikers.",
    "pros": [
      "Virtually unscratchable sapphire face",
      "Pinpoint GPS tracking under dense forest cover",
      "Offline topological maps on your wrist"
    ],
    "cons": [
      "Premium price point"
    ],
    "bestUseCase": "Ultra-marathons, backcountry trekking, and serious endurance sports"
  },
  {
    "id": 26,
    "name": "Lumina Ambient Dynamic Screenbar & Desk Lamp",
    "category": "Smart Living",
    "price": 1899,
    "originalPrice": 2999,
    "rating": 4.8,
    "reviewsCount": 310,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 370,
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    "description": "Monitor-mounted LED light bar with asymmetric optical design, wireless rotary dial controller, and stepless color temperature adjustment.",
    "features": [
      "Zero Screen Glare Asymmetric Optics",
      "Wireless Desktop Rotary Dial Remote",
      "Stepless Warm to Cool (2700K - 6500K)",
      "Powered by Monitor USB Port"
    ],
    "specs": {
      "Power": "5W USB-C",
      "CRI": "Ra > 95 (True Color Rendering)",
      "Length": "45cm",
      "ColorTemp": "2700K - 6500K"
    },
    "tags": "lamp desk light screenbar monitor setup accessories smart living",
    "aiScore": 95,
    "aiReason": "Eliminates screen reflection and eye fatigue during late-night coding and reading sessions.",
    "pros": [
      "Zero desk space taken (mounts on top of monitor)",
      "No reflection or glare on the screen",
      "Wireless dial turns on/off and dims seamlessly"
    ],
    "cons": [
      "Not compatible with curved monitors thicker than 45mm"
    ],
    "bestUseCase": "Late-night programming, studying, and clean desk workspace lighting"
  },
  {
    "id": 27,
    "name": "MagGrid 3-in-1 Fast Wireless Charging Station",
    "category": "Smart Living",
    "price": 2199,
    "originalPrice": 3499,
    "rating": 4.7,
    "reviewsCount": 225,
    "stock": 38,
    "stockStatus": "In Stock",
    "viewsCount": 330,
    "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    "description": "Sleek folding magnetic wireless charging dock that powers your phone (15W), smartwatch (5W), and wireless earbuds (5W) simultaneously.",
    "features": [
      "Charges 3 Devices Simultaneously",
      "Strong Snap-On Magnetic Alignment",
      "Folds Flat for Easy Travel",
      "Multi-Protect Temperature Safety Shield"
    ],
    "specs": {
      "PhoneOutput": "15W Fast Charge",
      "WatchOutput": "5W",
      "EarbudsOutput": "5W",
      "Input": "USB-C 30W Adapter Required"
    },
    "tags": "charger wireless magsafe dock stand accessories desk smart living",
    "aiScore": 93,
    "aiReason": "Replaces three messy charging cables with a single elegant desk stand.",
    "pros": [
      "Cleans up nightstand and desk cable clutter",
      "Strong magnetic hold in portrait or landscape",
      "Folds compact for hotel trips"
    ],
    "cons": [
      "Requires a 20W+ USB-C wall adapter"
    ],
    "bestUseCase": "Bedside nightstand and workstation charging"
  },
  {
    "id": 28,
    "name": "ErgoRest Solid Walnut Ergonomic Keyboard Palm Rest",
    "category": "Smart Living",
    "price": 1299,
    "originalPrice": 1999,
    "rating": 4.9,
    "reviewsCount": 180,
    "stock": 35,
    "stockStatus": "In Stock",
    "viewsCount": 240,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    "description": "Handcrafted from 100% natural North American black walnut wood with anti-slip rubber feet and smooth natural oil finish.",
    "features": [
      "100% Natural Solid Walnut Wood",
      "Ergonomic 8-Degree Incline Angle",
      "High-Grip Silicone Feet",
      "Beeswax Silky Hand-Polished Finish"
    ],
    "specs": {
      "Wood": "Solid Black Walnut",
      "Size": "36 x 8 x 1.8 cm (Fits 75% / Tenkeyless keyboards)",
      "Finish": "Natural Plant Oil",
      "Weight": "320g"
    },
    "tags": "wrist rest palm rest keyboard walnut wood ergonomic desk setup",
    "aiScore": 92,
    "aiReason": "Relieves carpal and wrist pressure during typing with premium natural walnut wood.",
    "pros": [
      "Keeps wrists at a healthy flat neutral angle",
      "Beautiful natural wood grain elevates any desk",
      "Doesn't get hot or sticky like foam/gel"
    ],
    "cons": [
      "Firm wooden support (not a soft squishy gel cushion)"
    ],
    "bestUseCase": "Mechanical keyboard typing, programming, and ergonomic desk setups"
  },
  {
    "id": 29,
    "name": "AeroKnit Merino Wool Minimalist Hoodie",
    "category": "Fashion & Apparel",
    "price": 3499,
    "originalPrice": 5999,
    "rating": 4.8,
    "reviewsCount": 312,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 520,
    "imageUrl": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    "description": "100% Australian extra-fine Merino wool hoodie with thermo-regulating breathability, anti-odor properties, and minimalist concealed pockets.",
    "features": [
      "100% Pure Extra-Fine Merino Wool",
      "Natural Thermo-Regulation & Breathable",
      "Concealed YKK Zipper Kangaroo Pouch",
      "Ribbed Ergonomic Cuffs & Hem",
      "Machine Washable Pre-Shrunk Knit"
    ],
    "specs": {
      "Material": "100% Merino Wool (19.5 micron)",
      "Fit": "Regular Tailored",
      "Weight": "380g",
      "Care": "Machine wash cold delicate"
    },
    "tags": "fashion apparel hoodie merino wool sweater streetwear minimal warm clothing black charcoal",
    "aiScore": 96,
    "aiReason": "Unmatched thermal efficiency and timeless minimalist aesthetics suitable for remote work or travel.",
    "pros": [
      "Exceptionally soft against skin",
      "Odor resistant for multiple wears",
      "Modern tailored silhouette"
    ],
    "cons": [
      "Requires gentle cycle drying"
    ],
    "bestUseCase": "All-season layering, cool-weather travel, and minimalist capsule wardrobe"
  },
  {
    "id": 30,
    "name": "UrbanTech Water-Repellent Stretch Cargo Chinos",
    "category": "Fashion & Apparel",
    "price": 2799,
    "originalPrice": 4499,
    "rating": 4.7,
    "reviewsCount": 264,
    "stock": 38,
    "stockStatus": "In Stock",
    "viewsCount": 410,
    "imageUrl": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    "description": "4-way stretch performance chinos treated with DWR water-repellent coating, magnetic cargo flaps, and gusseted crotch for unrestricted mobility.",
    "features": [
      "DWR Hydrophobic Stain & Water Coating",
      "4-Way Ergonomic Mechanical Stretch",
      "Magnetic Stealth Cargo Pockets",
      "Reinforced Triple-Stitched Seams",
      "Internal Hidden Phone Sleeve"
    ],
    "specs": {
      "Fabric": "68% Cotton, 28% Nylon, 4% Spandex",
      "Closure": "YKK Zip Fly with Cobrax Snap",
      "Fit": "Tapered Slim",
      "Water Resistance": "DWR Level 4"
    },
    "tags": "fashion apparel pants chinos cargo trousers stretch water resistant commuter olive khaki",
    "aiScore": 94,
    "aiReason": "High-performance techwear fabric tailored into an office-ready modern silhouette.",
    "pros": [
      "Stain and light rain resistant",
      "Superb flexibility for biking/walking",
      "Discreet magnetic pockets"
    ],
    "cons": [
      "Slim taper may fit snug on athletic calves"
    ],
    "bestUseCase": "Urban commuting, weekend travel, and smart-casual workspaces"
  },
  {
    "id": 31,
    "name": "PimaCore Heavyweight Organic T-Shirt (3-Pack)",
    "category": "Fashion & Apparel",
    "price": 1999,
    "originalPrice": 3299,
    "rating": 4.9,
    "reviewsCount": 640,
    "stock": 75,
    "stockStatus": "In Stock",
    "viewsCount": 880,
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    "description": "Essential 240 GSM organic Peruvian Pima cotton crewneck tees. Silky hand feel, zero-shrinkage preshrunk weave, and bound ribbed collar.",
    "features": [
      "240 GSM Heavyweight Organic Pima Cotton",
      "Long-Staple Fiber Silky Touch",
      "Non-Sag Ribbed Bound Collar",
      "Blind Hem Stitching",
      "Oeko-Tex Standard 100 Certified"
    ],
    "specs": {
      "Material": "100% Organic Pima Cotton",
      "Colors": "Onyx Black, Heather Grey, Ivory White",
      "Weave": "240 GSM Jersey",
      "Pack Size": "3 T-Shirts"
    },
    "tags": "fashion apparel t-shirt tee cotton organic basic crewneck black white grey pack clothing",
    "aiScore": 97,
    "aiReason": "Exceptional cost-per-wear value with 240 GSM heavyweight drape that holds shape wash after wash.",
    "pros": [
      "Dense opaque fabric with zero see-through",
      "Collar never curls or stretches",
      "Ultra soft long-staple cotton"
    ],
    "cons": [
      "Heavyweight fabric may be too warm for peak summer heat"
    ],
    "bestUseCase": "Everyday staple, layering under jackets, and casual wear"
  },
  {
    "id": 32,
    "name": "Aegis Tailored Waterproof Commuter Trench Coat",
    "category": "Fashion & Apparel",
    "price": 7499,
    "originalPrice": 11999,
    "rating": 4.9,
    "reviewsCount": 188,
    "stock": 20,
    "stockStatus": "In Stock",
    "viewsCount": 390,
    "imageUrl": "https://images.unsplash.com/photo-1539533018447-63fcce667883?w=800&q=80",
    "description": "Modern double-breasted technical trench coat engineered with 3-layer breathable membrane, storm flap, magnetic collar latch, and removable thermal fleece vest.",
    "features": [
      "15,000mm Hydrostatic Waterproof Rating",
      "Removable PrimaLoft Insulated Inner Vest",
      "Magnetic Wind Collar Latch",
      "Laser-Cut Breathable Underarm Vents",
      "Deep Fleece-Lined Hand Warmer Pockets"
    ],
    "specs": {
      "Shell": "3-Layer Bonded Polyamide with PTFE Membrane",
      "Lining": "Recycled Satin Polyester",
      "Weight": "820g",
      "Length": "Mid-Thigh (92cm)"
    },
    "tags": "fashion apparel jacket coat trench waterproof formal business outerwear charcoal black navy",
    "aiScore": 95,
    "aiReason": "Architectural silhouette combining sartorial elegance with mountaineering-grade storm protection.",
    "pros": [
      "100% rainproof with taped seams",
      "2-in-1 versatility with removable thermal vest",
      "Elevated corporate aesthetic"
    ],
    "cons": [
      "Investment price point"
    ],
    "bestUseCase": "Rainy executive commutes, European business travel, and formal evenings"
  },
  {
    "id": 33,
    "name": "Kuroki Japanese Selvedge Raw Denim Jeans (13.5oz)",
    "category": "Fashion & Apparel",
    "price": 4299,
    "originalPrice": 6999,
    "rating": 4.8,
    "reviewsCount": 195,
    "stock": 28,
    "stockStatus": "In Stock",
    "viewsCount": 340,
    "imageUrl": "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80",
    "description": "Woven on vintage Toyoda shuttle looms in Okayama, Japan. 13.5oz red-line selvedge denim that molds naturally to your body with distinctive honeycombs and whiskers.",
    "features": [
      "13.5oz Japanese Kuroki Mills Denim",
      "Classic Red-Line Selvedge ID",
      "Custom Solid Brass Donut Buttons",
      "Reinforced Hidden Back Pocket Rivets",
      "Sanforized 100% Long-Staple Cotton"
    ],
    "specs": {
      "Weight": "13.5oz Rigidbody Denim",
      "Cut": "Modern Straight Taper",
      "Hardware": "Custom Antiqued Brass",
      "Origin": "Okayama, Japan Mills"
    },
    "tags": "fashion apparel denim jeans pants selvedge raw japanese indigo dark blue clothing",
    "aiScore": 93,
    "aiReason": "Authentic heritage craftsmanship with distinctive personal fading potential over time.",
    "pros": [
      "Genuine Japanese shuttle loom quality",
      "Exceptional stitch durability",
      "Clean selvedge cuff accent"
    ],
    "cons": [
      "Initial stiffness requires break-in period"
    ],
    "bestUseCase": "Denim enthusiasts, casual smart styling, and enduring everyday wear"
  },
  {
    "id": 34,
    "name": "Veda Heritage Silk-Blend Festive Kurta & Nehru Jacket",
    "category": "Fashion & Apparel",
    "price": 3899,
    "originalPrice": 6299,
    "rating": 4.9,
    "reviewsCount": 220,
    "stock": 32,
    "stockStatus": "In Stock",
    "viewsCount": 475,
    "imageUrl": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
    "description": "Exquisite raw silk blend asymmetric kurta paired with a tailored structured bandhgala Nehru jacket. Handcrafted coconut shell buttons and breathable cotton lining.",
    "features": [
      "Artisanal Raw Silk & Modal Blend",
      "Tailored Structured Nehru Sleeveless Jacket",
      "Concealed Placket with Hand-Finished Seams",
      "Dual Side Slits with Functional Pockets",
      "Pre-washed for Colorfast Luster"
    ],
    "specs": {
      "Fabric": "60% Raw Silk, 40% Fine Modal",
      "Lining": "100% Breathable Mulmul Cotton",
      "Style": "Modern Indo-Western",
      "Care": "Dry clean recommended"
    },
    "tags": "fashion apparel kurta ethnic festive traditional nehru jacket indian wedding silk teal gold",
    "aiScore": 95,
    "aiReason": "Contemporary Indo-Western aesthetic with breathable mulmul cotton lining for long celebratory events.",
    "pros": [
      "Rich textured fabric without itchiness",
      "Flattering structured drape",
      "Deep functional pockets"
    ],
    "cons": [
      "Dry clean only for longest fabric luster"
    ],
    "bestUseCase": "Festive gatherings, weddings, and cultural celebrations"
  },
  {
    "id": 35,
    "name": "CyberBot X-1 AI Programmable Robotics STEM Kit",
    "category": "Toys & Gaming",
    "price": 4999,
    "originalPrice": 7999,
    "rating": 4.9,
    "reviewsCount": 380,
    "stock": 40,
    "stockStatus": "In Stock",
    "viewsCount": 710,
    "imageUrl": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "description": "Build and program 12 intelligent AI robots. Features ultrasonic obstacle avoidance, line tracking, gesture control, and drag-and-drop Python/Blockly coding.",
    "features": [
      "12-in-1 Modular Aluminum Chassis",
      "ESP32 Wi-Fi & Bluetooth Core",
      "Dual Ultrasonic & IR Line Sensors",
      "Scratch & Python 3 Guided Curriculum",
      "Rechargeable 2200mAh Li-Po Battery"
    ],
    "specs": {
      "Microcontroller": "ESP32 Dual-Core 240MHz",
      "Motors": "2x High-Torque Precision Steppers",
      "Ages": "8 - 16+ Years",
      "App": "iOS & Android Blockly Studio"
    },
    "tags": "toys gaming robotics stem science coding programming ai robot kit kids education",
    "aiScore": 98,
    "aiReason": "Top STEM educational gift combining mechanical assembly with real-world Python coding skills.",
    "pros": [
      "Comprehensive 40-project step-by-step app curriculum",
      "Sturdy aluminum parts (not flimsy plastic)",
      "Engaging obstacle avoidance & camera tracking"
    ],
    "cons": [
      "Initial assembly takes approximately 2 hours"
    ],
    "bestUseCase": "STEM learning, coding education, and creative engineering for kids and teens"
  },
  {
    "id": 36,
    "name": "AeroFalcon 4K Optical Flow GPS Drone",
    "category": "Toys & Gaming",
    "price": 6999,
    "originalPrice": 10999,
    "rating": 4.8,
    "reviewsCount": 420,
    "stock": 25,
    "stockStatus": "In Stock",
    "viewsCount": 890,
    "imageUrl": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
    "description": "Ultra-compact foldable quadcopter with stabilized 4K HDR camera, dual GPS auto-return, optical flow hovering, and 30-minute flight time per battery.",
    "features": [
      "4K 30fps EIS Stabilized Wide-Angle Camera",
      "Dual Satellite GPS/GLONASS Auto Return",
      "Optical Flow Sensor for Stable Indoor Hover",
      "30-Minute Flight Time per Battery (2 Batteries Included)",
      "Sub-249g Ultra-Lightweight (No Drone License Required)"
    ],
    "specs": {
      "Flight Range": "1.2 km FPV Transmission",
      "Camera": "4K Ultra-HD with 90° Gimbal Tilt",
      "Battery": "2x 7.7V 2100mAh Li-Po",
      "Weight": "242g (FlyCam Safe)"
    },
    "tags": "toys gaming drone quadcopter 4k camera flying rc aircraft gps tech outdoors",
    "aiScore": 97,
    "aiReason": "Sub-249g classification avoids regulatory registration while delivering crystal clear 4K aerial footage.",
    "pros": [
      "Extremely stable GPS and optical flow hold",
      "One-key return to home failsafe",
      "Comes with premium hard shell travel case"
    ],
    "cons": [
      "High winds over 35 km/h can affect stability"
    ],
    "bestUseCase": "Aerial videography, outdoor adventures, and RC aviation hobbyists"
  },
  {
    "id": 37,
    "name": "PocketArcade Retro 3.5-inch IPS Handheld Console",
    "category": "Toys & Gaming",
    "price": 3299,
    "originalPrice": 5499,
    "rating": 4.8,
    "reviewsCount": 510,
    "stock": 60,
    "stockStatus": "In Stock",
    "viewsCount": 780,
    "imageUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "description": "Nostalgic portable gaming machine loaded with 5,000+ classic 8-bit to 32-bit retro titles. Features vibrant 3.5-inch 640x480 OCA IPS display and hall-effect joysticks.",
    "features": [
      "Vibrant 3.5-inch OCA Full-Lamination IPS Screen",
      "Pre-loaded with 5,000+ Classic Retro Games",
      "Dual Hall-Effect Drift-Proof Analog Sticks",
      "3500mAh Battery (up to 7 Hours Continuous Play)",
      "Mini-HDMI TV Out & 3.5mm Headphone Jack"
    ],
    "specs": {
      "Screen": "3.5-inch IPS 640x480 Resolution",
      "CPU": "Quad-Core Cortex-A35 1.5GHz",
      "RAM": "1GB LPDDR3",
      "Storage": "64GB MicroSD (Expandable to 256GB)"
    },
    "tags": "toys gaming retro console arcade handheld gameboy nintendo sega portable emulator",
    "aiScore": 96,
    "aiReason": "Instant pick-up-and-play nostalgia with modern drift-free hall effect joysticks and vibrant IPS display.",
    "pros": [
      "Vibrant colors on 4:3 aspect ratio screen",
      "Zero stick drift with Hall Effect sensors",
      "Huge game library ready out of the box"
    ],
    "cons": [
      "Internal speaker is loud but lacks heavy bass"
    ],
    "bestUseCase": "Commutes, travel entertainment, and retro arcade enthusiasts"
  },
  {
    "id": 38,
    "name": "MechaTitan 3D Wooden Kinetic Orrery Mechanical Puzzle",
    "category": "Toys & Gaming",
    "price": 2199,
    "originalPrice": 3499,
    "rating": 4.9,
    "reviewsCount": 340,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 560,
    "imageUrl": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
    "description": "Laser-cut 316-piece mechanical solar system model. Clockwork spring-driven gears rotate the planets at true relative orbital speeds. Zero glue required.",
    "features": [
      "316 Precision Laser-Cut Baltic Birch Parts",
      "Spring-Driven Mechanical Wind-Up Motor",
      "Realistic Relative Gear Ratio Planetary Orbit",
      "Zero Glue or Screws Required for Assembly",
      "Engraved Zodiac & Constellation Outer Dial"
    ],
    "specs": {
      "Material": "100% High-Density Baltic Birch Wood",
      "Assembly Time": "4 - 5 Hours",
      "Pieces": "316 Parts",
      "Finished Dimensions": "33cm x 33cm x 26cm"
    },
    "tags": "toys gaming puzzle 3d wooden mechanical model solar system orrery stem diy hobby craft",
    "aiScore": 95,
    "aiReason": "Mesmerizing tabletop kinetic sculpture providing rewarding screen-free meditative assembly.",
    "pros": [
      "Flawless laser-cut snap-fit tolerances",
      "Hypnotic gear train motion once wound",
      "Stunning natural wood desk centerpiece"
    ],
    "cons": [
      "Requires patience and gentle wax application on gears during assembly"
    ],
    "bestUseCase": "Mindful building, decorative desktop sculpture, and astronomy enthusiasts"
  },
  {
    "id": 39,
    "name": "RoboBuddy Interactive AI Companion Desktop Pet",
    "category": "Toys & Gaming",
    "price": 5499,
    "originalPrice": 8999,
    "rating": 4.8,
    "reviewsCount": 290,
    "stock": 30,
    "stockStatus": "In Stock",
    "viewsCount": 650,
    "imageUrl": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&q=80",
    "description": "Miniature emotional desktop robot with OLED expressive eyes, voice recognition, touch sensors, ambient sound reactions, and desk-edge fall protection.",
    "features": [
      "1.5-inch Color Animated OLED Face Expressions",
      "HD Wide-Angle Camera for Facial Recognition",
      "Capacitive Head & Chin Touch Sensors",
      "Edge-Detecting Infrared Ground Sensors (Never Falls off Desk)",
      "Built-in Timer, Pomodoro, Weather & Music Dance Mode"
    ],
    "specs": {
      "Sensors": "Camera, 4x Mic Array, Touch, 6-Axis IMU, Cliff Sensors",
      "Connectivity": "Wi-Fi 2.4GHz + BLE 5.0",
      "Battery": "1800mAh (4 hours active)",
      "Charging": "Magnetic Wireless Charging Dock"
    },
    "tags": "toys gaming robot companion ai desktop pet interactive gadget smart tech cute",
    "aiScore": 94,
    "aiReason": "Lively desktop companion that boosts work productivity with interactive Pomodoro timers and playful personalities.",
    "pros": [
      "Genuinely charming personality and animations",
      "Safe edge detection keeps it secure on desks",
      "Regular OTA software updates add new tricks"
    ],
    "cons": [
      "Requires Wi-Fi connection for advanced voice queries"
    ],
    "bestUseCase": "Home office desk companion, tech gifts, and smart interactive entertainment"
  },
  {
    "id": 40,
    "name": "GravityFlux Kinetic Marble Run STEM Engineering Set",
    "category": "Toys & Gaming",
    "price": 2599,
    "originalPrice": 3999,
    "rating": 4.9,
    "reviewsCount": 460,
    "stock": 55,
    "stockStatus": "In Stock",
    "viewsCount": 610,
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80",
    "description": "180-piece magnetic kinetic track construction set with trampolines, loop-de-loops, magnetic cannons, and elevator spiral lifts to master gravity and momentum.",
    "features": [
      "180 Modular Snap-Together Kinetic Track Pieces",
      "Magnetic Gauss Cannon Launcher",
      "Spiral Marble Escalator Continuous Lift",
      "Transparent High-Speed Vortex Funnels",
      "Illustrated 50-Challenge Physics Puzzle Book"
    ],
    "specs": {
      "Parts": "180 Components + 12 High-Velocity Steel Marbles",
      "Material": "BPA-Free Shatterproof ABS Plastic",
      "Recommended Age": "6 - 14+ Years",
      "Box Dimensions": "42 x 30 x 9 cm"
    },
    "tags": "toys gaming marble run stem physics kinetic track building blocks construction puzzle kids",
    "aiScore": 97,
    "aiReason": "Infinitely reconfigurable STEM track system that teaches real physics concepts through hands-on play.",
    "pros": [
      "Magnetic cannon launches marbles at exciting speeds",
      "Sturdy snap pieces withstand enthusiastic play",
      "Hours of screen-free creative experimentation"
    ],
    "cons": [
      "Small marbles require supervision for toddlers under 3"
    ],
    "bestUseCase": "Family game night, creative STEM classroom activities, and physics problem-solving"
  },
  {
    "id": 41,
    "name": "LumiBeam 4K HDR Smart Portable Laser Projector",
    "category": "Electronics",
    "price": 8999,
    "originalPrice": 13999,
    "rating": 4.8,
    "reviewsCount": 320,
    "stock": 22,
    "stockStatus": "In Stock",
    "viewsCount": 750,
    "imageUrl": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
    "description": "Compact 1000 ANSI Lumens ALPD laser projector with auto-focus, keystone calibration, built-in Harman/Kardon audio, and Android TV streaming apps.",
    "features": [
      "1000 ANSI Lumens ALPD Ultra-Bright Laser",
      "Instant Auto-Keystone & Obstacle Avoidance",
      "Integrated Harman/Kardon Dual 10W Speakers",
      "Native Android TV with Netflix & Prime Video",
      "Built-in 2.5-Hour Battery for Outdoor Cinema"
    ],
    "specs": {
      "Resolution": "Native 1080p, 4K Decoding Support",
      "Brightness": "1000 ANSI Lumens",
      "Projection Size": "40 - 150 inches",
      "Inputs": "HDMI 2.1, USB, Bluetooth 5.2, Wi-Fi 6"
    },
    "tags": "electronics home cinema projector laser 4k portable smart tv movie streaming audio",
    "aiScore": 96,
    "aiReason": "Laser brightness allows comfortable daytime viewing with seamless auto-focus alignment.",
    "pros": [
      "Sharp cinematic 150-inch picture",
      "Incredible speaker fidelity for a compact chassis",
      "Fast 3-second auto autofocus"
    ],
    "cons": [
      "Fan noise is perceptible in silent room settings"
    ],
    "bestUseCase": "Backyard movie nights, bedroom home theater, and gaming on large displays"
  },
  {
    "id": 42,
    "name": "CyberKey Pro Wireless 75% Mechanical Keyboard",
    "category": "Electronics",
    "price": 4299,
    "originalPrice": 6499,
    "rating": 4.9,
    "reviewsCount": 580,
    "stock": 45,
    "stockStatus": "In Stock",
    "viewsCount": 920,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    "description": "Hot-swappable gasket-mounted mechanical keyboard with pre-lubed linear switches, south-facing RGB, CNC aluminum volume knob, and tri-mode connectivity.",
    "features": [
      "Gasket-Mounted Sound Absorbing Poron Foam",
      "Hot-Swappable 5-Pin Switch Sockets",
      "Factory Pre-Lubed Gateron Pro Yellow Switches",
      "Tri-Mode: 2.4GHz Wireless, Bluetooth 5.1 & USB-C",
      "Solid CNC Anodized Aluminum Rotary Knob"
    ],
    "specs": {
      "Layout": "75% Compact (82 Keys)",
      "Keycaps": "Dye-Sublimated PBT Cherry Profile",
      "Battery": "4000mAh (up to 200 hours RGB off)",
      "Compatibility": "Mac, Windows, iOS, Android"
    },
    "tags": "electronics keyboard mechanical wireless 75% switches rgb developer programming gamer",
    "aiScore": 98,
    "aiReason": "Deep creamy acoustic profile and buttery smooth typing feel right out of the box.",
    "pros": [
      "Deep thocky typing sound without modding",
      "Seamless macOS and Windows keycaps included",
      "Multi-device wireless switching"
    ],
    "cons": [
      "Heavy aluminum sub-frame is less ideal for daily backpacking"
    ],
    "bestUseCase": "Software engineering, typing enthusiasts, and clean desk setups"
  },
  {
    "id": 43,
    "name": "AuraStream Pro USB-C Studio Condenser Microphone",
    "category": "Electronics",
    "price": 3499,
    "originalPrice": 5299,
    "rating": 4.8,
    "reviewsCount": 390,
    "stock": 35,
    "stockStatus": "In Stock",
    "viewsCount": 640,
    "imageUrl": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    "description": "24-bit 96kHz studio broadcast condenser microphone with tap-to-mute sensor, cardioid polar pattern, internal pop filter, and zero-latency headphone monitoring.",
    "features": [
      "24-bit / 96kHz Studio-Grade Sound Resolution",
      "Capacitive Instant Tap-to-Mute with LED Indicator",
      "Cardioid Polar Pattern Isolates Voice from Keyboard Clicks",
      "Built-in Dual-Layer Shock Mount & Internal Pop Filter",
      "Plug-and-Play USB-C (No Audio Interface Required)"
    ],
    "specs": {
      "Capsule": "14mm Premium Electret Condenser",
      "Frequency Response": "20Hz - 20,000Hz",
      "Sample Rate": "96kHz / 24-bit",
      "Connector": "USB-C to USB-A/C Braided Cable"
    },
    "tags": "electronics audio microphone mic podcast streaming zoom studio recording usb condenser",
    "aiScore": 95,
    "aiReason": "Broadcast-quality vocal clarity that eliminates background room echo and typing noise.",
    "pros": [
      "Crisp warm vocal pickup",
      "Instant tap-to-mute prevents meeting mishaps",
      "Solid heavy cast metal desk stand"
    ],
    "cons": [
      "Cardioid only; lacks omnidirectional stereo pattern"
    ],
    "bestUseCase": "Podcasting, Zoom meetings, Discord gaming, and content creation"
  },
  {
    "id": 44,
    "name": "VoltTitan 140W GaN 27,600mAh Power Bank",
    "category": "Electronics",
    "price": 3999,
    "originalPrice": 5999,
    "rating": 4.9,
    "reviewsCount": 470,
    "stock": 50,
    "stockStatus": "In Stock",
    "viewsCount": 810,
    "imageUrl": "https://images.unsplash.com/photo-1609592424368-f99a8369ec2d?w=800&q=80",
    "description": "Airline-safe 99.8Wh portable power station delivering full 140W PD 3.1 fast charging. Fast charges a 16-inch MacBook Pro or gaming laptop from 0 to 50% in 30 minutes.",
    "features": [
      "140W Power Delivery 3.1 Dual USB-C Fast Charging",
      "27,600mAh (99.8Wh TSA Airline Approved Capacity)",
      "Smart Color Digital Display Showing Watts & Battery Health",
      "Charges 3 Devices Simultaneously (Laptop, Phone, Watch)",
      "Rapid 65W Recharge in 75 Minutes"
    ],
    "specs": {
      "Total Output": "140W Max across 2x USB-C + 1x USB-A",
      "Cell Capacity": "27,600mAh / 99.8Wh",
      "Weight": "530g",
      "Protocols": "PD 3.1, QC 4.0, PPS, Apple 2.4A"
    },
    "tags": "electronics power bank charger portable battery usbc 140w gan macbook laptop fast charge",
    "aiScore": 97,
    "aiReason": "Maximum legal airline capacity with true 140W continuous output for demanding workstations.",
    "pros": [
      "Can charge high-draw laptops at full speed",
      "Informative real-time wattage display",
      "Aircraft carry-on compliant"
    ],
    "cons": [
      "Heavier than standard phone power banks"
    ],
    "bestUseCase": "Digital nomads, outdoor remote work, and long-haul flights"
  },
  {
    "id": 45,
    "name": "ClarityPro 4K AI Auto-Tracking Webcam",
    "category": "Electronics",
    "price": 3199,
    "originalPrice": 4799,
    "rating": 4.7,
    "reviewsCount": 310,
    "stock": 40,
    "stockStatus": "In Stock",
    "viewsCount": 590,
    "imageUrl": "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80",
    "description": "Sony STARVIS sensor webcam with AI auto-framing, dual noise-canceling beamforming microphones, magnetic privacy shutter, and soft 3-level ring light.",
    "features": [
      "Sony STARVIS 4K Ultra-HD 60fps Sensor",
      "AI Subject Auto-Framing & Gesture Control Zoom",
      "Integrated Touch-Controlled Bi-Color Ring Light",
      "Dual Omnidirectional Noise-Cancelling Microphones",
      "Physical Magnetic Privacy Lens Cover"
    ],
    "specs": {
      "Sensor": "1/2.8-inch Sony CMOS",
      "Resolution": "3840x2160 @ 30fps / 1080p @ 60fps",
      "Field of View": "65° / 78° / 90° Adjustable",
      "Mounting": "Universal Monitor Clip + 1/4 inch Tripod Thread"
    },
    "tags": "electronics webcam camera 4k video streaming zoom work from home conference call lighting",
    "aiScore": 94,
    "aiReason": "Superior low-light Sony sensor paired with convenient built-in ring illumination.",
    "pros": [
      "Vibrant natural skin tones even in dim rooms",
      "Fast and smooth AI facial tracking",
      "Built-in magnetic lens cover for privacy"
    ],
    "cons": [
      "4K 60fps requires USB 3.0 port connection"
    ],
    "bestUseCase": "Executive video calls, remote job interviews, and game streaming"
  },
  {
    "id": 46,
    "name": "Horizon Nano Mini Workstation (Ryzen 9, 32GB, 1TB)",
    "category": "Laptops & Computers",
    "price": 38999,
    "originalPrice": 54999,
    "rating": 4.9,
    "reviewsCount": 165,
    "stock": 15,
    "stockStatus": "In Stock",
    "viewsCount": 480,
    "imageUrl": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
    "description": "Palm-sized powerhouse equipped with AMD Ryzen 9 7940HS processor, Radeon 780M graphics, 32GB DDR5 RAM, and triple 4K display output. Consumes only 45W.",
    "features": [
      "AMD Ryzen 9 7940HS (8 Cores, 16 Threads up to 5.2GHz)",
      "32GB Dual-Channel DDR5 5600MHz RAM",
      "1TB PCIe 4.0 NVMe High-Speed SSD",
      "Radeon 780M RDNA3 Integrated GPU",
      "Triple Display Support (Dual HDMI 2.1 + USB4 40Gbps)"
    ],
    "specs": {
      "Dimensions": "12.8cm x 12.6cm x 5.2cm",
      "Ports": "2x USB4, 4x USB 3.2, 2x HDMI 2.1, 2.5G LAN",
      "Power": "100W GaN Adapter",
      "OS": "Windows 11 Pro Pre-Installed"
    },
    "tags": "laptops computers mini pc desktop ryzen workstation compact developer gaming 4k",
    "aiScore": 97,
    "aiReason": "Desk space saver delivering full desktop performance with virtually silent dual-copper cooling.",
    "pros": [
      "Massive processing horsepower in a 5-inch box",
      "Supports 3 simultaneous 4K displays",
      "Easily upgradeable RAM and dual SSD slots"
    ],
    "cons": [
      "External power brick required"
    ],
    "bestUseCase": "Compact coding workstation, home media server, and productivity multi-tasking"
  },
  {
    "id": 47,
    "name": "OmniDock 14-in-1 Dual 4K Thunderbolt 4 Dock",
    "category": "Laptops & Computers",
    "price": 6999,
    "originalPrice": 9999,
    "rating": 4.8,
    "reviewsCount": 280,
    "stock": 32,
    "stockStatus": "In Stock",
    "viewsCount": 510,
    "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    "description": "One-cable workstation hub with 14 expansion ports, 96W upstream host laptop charging, dual 4K 60Hz display outputs, Gigabit Ethernet, and SD 4.0 card reader.",
    "features": [
      "14 High-Speed Expansion Ports",
      "96W Host Power Delivery Fast Laptop Charging",
      "Dual 4K 60Hz / Single 8K Display Output",
      "UHS-II 312MB/s High-Speed SD/TF Card Slots",
      "Solid Heavy Aluminum Heat-Dissipating Body"
    ],
    "specs": {
      "Ports": "2x HDMI 2.0, 1x DP 1.4, 3x USB-C, 5x USB-A 3.1, Gigabit RJ45, 3.5mm Audio",
      "Chipset": "Intel Certified Thunderbolt Controller",
      "Power": "135W DC Power Supply Included"
    },
    "tags": "laptops computers docking station hub thunderbolt usbc macbook dual monitor 4k accessories",
    "aiScore": 95,
    "aiReason": "Declutters desks with a single cable that charges, drives dual monitors, and connects all peripherals.",
    "pros": [
      "Zero display flicker on Apple Silicon and Windows",
      "Fast 96W laptop charging",
      "Premium matte aluminum finish"
    ],
    "cons": [
      "Requires dedicated desk space and external wall plug"
    ],
    "bestUseCase": "Clean desk setup, MacBook and Windows laptop docking, and photo/video editing"
  },
  {
    "id": 48,
    "name": "ErgoLift Heavy-Duty Aluminum Dual Monitor Arm",
    "category": "Laptops & Computers",
    "price": 3499,
    "originalPrice": 5299,
    "rating": 4.8,
    "reviewsCount": 340,
    "stock": 40,
    "stockStatus": "In Stock",
    "viewsCount": 460,
    "imageUrl": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    "description": "Aerospace-grade mechanical gas spring dual monitor mount. Holds two screens up to 34 inches (10kg each) with smooth 360° rotation and integrated cable channels.",
    "features": [
      "Heavy-Duty Gas Spring Arms Tested for 25,000 Cycles",
      "Supports 17 to 34 inch Monitors (Up to 10kg per Arm)",
      "Full 360° Swivel, +90°/-45° Tilt & Portrait/Landscape Rotation",
      "Quick-Release VESA Plates (75x75 & 100x100mm)",
      "Integrated Concealed Cable Management Tunnels"
    ],
    "specs": {
      "Material": "Aircraft-Grade Cast Aluminum & Cold Rolled Steel",
      "Clamp Range": "Desk thickness 10mm - 85mm (C-Clamp & Grommet)",
      "Weight": "4.8kg"
    },
    "tags": "laptops computers monitor arm dual mount desk ergonomics gas spring vesa setup",
    "aiScore": 94,
    "aiReason": "Reclaims up to 40% of desk surface while providing ergonomic eye-level posture.",
    "pros": [
      "Silky smooth gas spring adjustment",
      "Supports ultrawide and heavy gaming monitors",
      "Robust heavy clamp with zero desk wobble"
    ],
    "cons": [
      "Initial gas spring tension requires Allen wrench adjustment"
    ],
    "bestUseCase": "Dual monitor developer desks, ergonomic posture correction, and finance trading stations"
  },
  {
    "id": 49,
    "name": "AeroGlide Knit Everyday Comfort Slip-Ons",
    "category": "Footwear",
    "price": 2199,
    "originalPrice": 3499,
    "rating": 4.7,
    "reviewsCount": 390,
    "stock": 50,
    "stockStatus": "In Stock",
    "viewsCount": 610,
    "imageUrl": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    "description": "Ultra-breathable 3D engineered knit slip-ons with memory foam orthotic insoles, collapsible heel, and featherweight 180g EVA outsole.",
    "features": [
      "Seamless 3D Engineered Breathable Jacquard Knit",
      "Orthopedic Arch-Support Memory Cushion Insole",
      "Featherweight Construction (Only 180g per Shoe)",
      "Convertible Heel (Slip-on or Loafer Mode)",
      "Machine Washable with Quick Air-Dry"
    ],
    "specs": {
      "Upper": "Recycled Poly-Knit",
      "Midsole": "Ultra-Cloud EVA Cushioning",
      "Sole": "Non-Slip Micro-Tread Rubber",
      "Weight": "180g (Size 9)"
    },
    "tags": "footwear shoes slip-on sneakers loafers knit breathable lightweight everyday casual travel",
    "aiScore": 94,
    "aiReason": "The ultimate airport security and walking shoe with instant slip-on convenience.",
    "pros": [
      "Feels like walking on clouds",
      "Never rubs blisters; barefoot friendly",
      "Folds flat in luggage"
    ],
    "cons": [
      "Not intended for heavy rain or deep mud"
    ],
    "bestUseCase": "Airport travel, daily campus/office walking, and weekend leisure"
  },
  {
    "id": 50,
    "name": "TerraGrip GORE-TEX All-Terrain Trail Runners",
    "category": "Footwear",
    "price": 4799,
    "originalPrice": 7499,
    "rating": 4.9,
    "reviewsCount": 275,
    "stock": 32,
    "stockStatus": "In Stock",
    "viewsCount": 480,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "description": "GORE-TEX waterproof trail running shoes with 5mm Vibram Megagrip chevron lugs, rock protection plate, and carbon composite stability shank.",
    "features": [
      "Genuine GORE-TEX Invisible Fit Waterproof Membrane",
      "Vibram Megagrip Outsole with 5mm Deep Traction Lugs",
      "Embedded Forefoot Rock Protection Shield Plate",
      "Quick-Lace Drawcord System with Lace Garage Pouch",
      "High-Rebound Supercritical Nitrogen-Infused Midsole"
    ],
    "specs": {
      "Drop": "6mm Heel-to-Toe",
      "Weight": "295g",
      "Lugs": "5mm Directional Traction",
      "Waterproofing": "100% GORE-TEX Guaranteed"
    },
    "tags": "footwear shoes trail running goretex waterproof vibram hiking outdoors red black",
    "aiScore": 97,
    "aiReason": "Unshakable grip on wet slippery granite and muddy monsoon mountain trails.",
    "pros": [
      "Keeps feet dry even when submerging in streams",
      "Relentless traction on loose gravel and mud",
      "Snug foot-lock lacing system"
    ],
    "cons": [
      "Firm outsole is noisy when walking on smooth tile floors"
    ],
    "bestUseCase": "Monsoon trekking, trail racing, and rough terrain hiking"
  },
  {
    "id": 51,
    "name": "CloudBounce Post-Workout Recovery Slides",
    "category": "Footwear",
    "price": 1499,
    "originalPrice": 2299,
    "rating": 4.8,
    "reviewsCount": 520,
    "stock": 70,
    "stockStatus": "In Stock",
    "viewsCount": 740,
    "imageUrl": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    "description": "Thick 4cm dual-density foam recovery sandals designed with anatomical biomechanical arch support to alleviate plantar fasciitis and leg fatigue.",
    "features": [
      "4cm Ultra-Thick Dynamic Energy Return Cushioning",
      "Podiatrist-Designed Biomechanical Arch Cradle",
      "Waterproof Closed-Cell EVA Foam (Zero Odor Absorption)",
      "Textured Non-Slip Footbed & Wave Traction Bottom",
      "Wide Ergonomic Toe Box Prevents Pinching"
    ],
    "specs": {
      "Material": "Single-Mold Medical-Grade Injection EVA",
      "Sole Thickness": "40mm",
      "Weight": "140g",
      "Waterproof": "100% Shower and Pool Safe"
    },
    "tags": "footwear slides sandals slippers recovery comfort soft arch support beach gym casual",
    "aiScore": 95,
    "aiReason": "Instant relief for tired feet and aching heels after running or long standing shifts.",
    "pros": [
      "Unbelievably plush shock absorption",
      "Helps soothe heel pain and plantar fasciitis",
      "Cleans in seconds with water"
    ],
    "cons": [
      "Slightly bulky aesthetic"
    ],
    "bestUseCase": "Post-workout recovery, around-the-house comfort, pool and beach"
  },
  {
    "id": 52,
    "name": "HydroArmor 32oz Vacuum-Insulated Thermal Flask",
    "category": "Outdoor Gear",
    "price": 1299,
    "originalPrice": 1999,
    "rating": 4.9,
    "reviewsCount": 710,
    "stock": 80,
    "stockStatus": "In Stock",
    "viewsCount": 950,
    "imageUrl": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    "description": "Pro-grade 18/8 stainless steel double-wall vacuum insulated water bottle. Keeps ice cold for 36 hours or soup steaming hot for 18 hours. Sweat-free powder coat.",
    "features": [
      "Double-Wall Vacuum TempShield Insulation",
      "Pro-Grade 18/8 Kitchen Stainless Steel (BPA & Toxin Free)",
      "36 Hours Ice-Cold / 18 Hours Steaming Hot",
      "Textured Matte Grip Powder Coat Finish",
      "Leak-Proof Chug Lid with Flexible Carry Strap"
    ],
    "specs": {
      "Capacity": "32 oz / 946 ml",
      "Mouth Diameter": "Wide 58mm (Ice Cube Friendly)",
      "Weight": "410g empty",
      "Warranty": "Lifetime Leakproof Guarantee"
    },
    "tags": "outdoor gear water bottle flask thermos stainless steel insulated travel gym trekking teal",
    "aiScore": 96,
    "aiReason": "Indestructible construction that maintains freezing water temperature on scorching summer treks.",
    "pros": [
      "Never leaks a single drop inside bags",
      "Ice cubes stay frozen overnight",
      "Durable scratch-resistant powder finish"
    ],
    "cons": [
      "Wide body does not fit narrow automotive cupholders"
    ],
    "bestUseCase": "Gym workouts, camping, daily hydration, and road trips"
  },
  {
    "id": 53,
    "name": "SolarPulse 28W Foldable High-Efficiency Solar Panel",
    "category": "Outdoor Gear",
    "price": 2999,
    "originalPrice": 4599,
    "rating": 4.8,
    "reviewsCount": 230,
    "stock": 35,
    "stockStatus": "In Stock",
    "viewsCount": 410,
    "imageUrl": "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80",
    "description": "SunPower monocrystalline folding solar array with 24% conversion efficiency, dual smart USB-C/A ports, and rugged IPX4 water-resistant canvas backing.",
    "features": [
      "SunPower Monocrystalline Cells with 24% Efficiency",
      "Dual Output: 20W USB-C PD + 18W USB-A QC 3.0",
      "Smart Auto-Restart Technology upon Cloud Cover",
      "Rugged 900D Weather-Resistant Cordura Backing",
      "Folds into a Compact Book-Sized Package with 4 Carabiners"
    ],
    "specs": {
      "Wattage": "28W Peak",
      "Unfolded Size": "86cm x 29cm",
      "Folded Size": "29cm x 17cm x 3cm",
      "Weight": "650g"
    },
    "tags": "outdoor gear solar charger panel portable camping hiking emergency power renewable sun",
    "aiScore": 94,
    "aiReason": "Essential off-grid power generator that clips directly onto backpacks during daytime hikes.",
    "pros": [
      "Charges phones and power banks at full speed in direct sun",
      "Durable water-resistant ETFE coating",
      "Lightweight and packs flat"
    ],
    "cons": [
      "Charging speed drops significantly under heavy overcast skies"
    ],
    "bestUseCase": "Multi-day backpacking, wilderness camping, and emergency bug-out kits"
  },
  {
    "id": 54,
    "name": "NightBeacon 1000 Lumens Dual-Beam Headlamp",
    "category": "Outdoor Gear",
    "price": 1699,
    "originalPrice": 2699,
    "rating": 4.9,
    "reviewsCount": 380,
    "stock": 60,
    "stockStatus": "In Stock",
    "viewsCount": 520,
    "imageUrl": "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&q=80",
    "description": "Ultralight USB-C rechargeable headlamp delivering 1000 lumens across spot and flood LEDs, auxiliary red night vision mode, and 60° tilt adjustment.",
    "features": [
      "1000 Lumens Max Output with 150-Meter Beam Distance",
      "Independent Floodlight, Spotlight & Red Light Modes",
      "Wave Sensor Hand Gesture On/Off Activation",
      "USB-C Fast Charging with Battery Level Gauge",
      "IP68 Waterproof & 2-Meter Drop Impact Resistant"
    ],
    "specs": {
      "Battery": "1800mAh Li-Po (Up to 45 Hours in Eco Mode)",
      "Weight": "68g (including headband)",
      "Beam Angle": "60° Tiltable Pivot",
      "Waterproof Rating": "IP68 Submersible"
    },
    "tags": "outdoor gear headlamp flashlight camping hiking running night lighting led waterproof",
    "aiScore": 97,
    "aiReason": "Hands-free wave sensor activation lets you turn the light on/off without touching it with muddy gloves.",
    "pros": [
      "Astonishingly bright for weighing only 68g",
      "Preserves night vision with soft red mode",
      "Comfortable sweat-wicking headband"
    ],
    "cons": [
      "Turbo 1000 lumen mode steps down after 2 minutes to prevent overheating"
    ],
    "bestUseCase": "Night trail running, setting up tents in the dark, and emergency car repairs"
  },
  {
    "id": 55,
    "name": "AeroShield Carbon RFID Minimalist Wallet",
    "category": "Bags & Accessories",
    "price": 1499,
    "originalPrice": 2499,
    "rating": 4.8,
    "reviewsCount": 610,
    "stock": 65,
    "stockStatus": "In Stock",
    "viewsCount": 840,
    "imageUrl": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    "description": "Forged 3K matte carbon fiber plates with military-grade aluminum inner core, integrated cash strap, and spring-loaded quick card ejection holding up to 12 cards.",
    "features": [
      "Genuine 3K Aerospace Matte Carbon Fiber Plates",
      "Spring-Action Quick Card Fan Ejection Lever",
      "Full Frequency RFID / NFC Anti-Skimming Blocking",
      "Heavy-Duty Elastic Cash Band for Folded Bills",
      "Ultrathin 8mm Profile (Weighs Only 48g)"
    ],
    "specs": {
      "Capacity": "1 to 12 Cards + Cash",
      "Thickness": "8mm unloaded",
      "Material": "3K Carbon Fiber & Aircraft Aluminum",
      "Weight": "48g"
    },
    "tags": "bags accessories wallet carbon fiber rfid slim cardholder minimalist front pocket",
    "aiScore": 95,
    "aiReason": "Eliminates back pocket bulge while shielding credit cards from digital pickpockets.",
    "pros": [
      "One-click fanning of cards for instant access",
      "Indestructible carbon fiber finish",
      "Discreet and lightweight in front pockets"
    ],
    "cons": [
      "Holding more than 10 coins is not supported"
    ],
    "bestUseCase": "Minimalist everyday carry, front-pocket carry, and business travel"
  },
  {
    "id": 56,
    "name": "TitanRing Horizon Smart Health & Sleep Tracker",
    "category": "Wearables",
    "price": 7999,
    "originalPrice": 12999,
    "rating": 4.8,
    "reviewsCount": 310,
    "stock": 25,
    "stockStatus": "In Stock",
    "viewsCount": 680,
    "imageUrl": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    "description": "Sleek aerospace titanium smart ring tracking sleep stages, readiness score, heart rate variability (HRV), and skin temperature with 7-day battery life.",
    "features": [
      "Hypoallergenic Aerospace Titanium Exterior",
      "Continuous Optical PPG Heart Rate & SpO2 Sensors",
      "Clinical-Grade Negative Temperature Coefficient Thermometer",
      "100-Meter Water Resistance (Swim and Shower Safe)",
      "7-Day Battery Life on a Single 40-Minute Wireless Charge"
    ],
    "specs": {
      "Sizes": "Standard US 7, 8, 9, 10, 11, 12",
      "Weight": "4.2g",
      "Waterproof": "10 ATM (100m)",
      "Charging": "Magnetic Ring Sizing Pedestal"
    },
    "tags": "wearables smart ring health fitness tracker titanium sleep hrv heart rate bio sensor",
    "aiScore": 97,
    "aiReason": "Screen-free unobtrusive health tracking that measures metrics at the finger where blood pulse signals are strongest.",
    "pros": [
      "Extremely comfortable to wear 24/7 even while sleeping",
      "No monthly subscription fees required",
      "Week-long battery life"
    ],
    "cons": [
      "Must verify finger ring size before purchasing"
    ],
    "bestUseCase": "Sleep optimization, discrete recovery tracking, and athletic recovery"
  },
  {
    "id": 57,
    "name": "PureAura Smart Silent HEPA-14 Air Purifier",
    "category": "Smart Living",
    "price": 5999,
    "originalPrice": 9499,
    "rating": 4.9,
    "reviewsCount": 420,
    "stock": 30,
    "stockStatus": "In Stock",
    "viewsCount": 710,
    "imageUrl": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    "description": "Medical-grade True HEPA-14 4-stage air filtration system capturing 99.99% of airborne PM2.5, pollen, smoke, and odors in rooms up to 550 sq ft with whisper-quiet 20dB sleep mode.",
    "features": [
      "True Medical-Grade HEPA-14 Filtration (0.1 Micron)",
      "Laser Air Quality Sensor with Real-Time AQI Digital Ring",
      "Cleans a 500 sq ft Living Room in 15 Minutes (CADR 350 m³/h)",
      "Ultra-Silent Sleep Mode Operating at Just 20dB",
      "Smart Mobile App Control with Voice Assistant Integration"
    ],
    "specs": {
      "CADR": "350 m³/h",
      "Coverage Area": "Up to 550 sq ft (51 m²)",
      "Noise Level": "20dB - 48dB",
      "Power Consumption": "32W at max speed"
    },
    "tags": "smart living home air purifier hepa filter indoor air quality allergy smoke dust whisper silent",
    "aiScore": 96,
    "aiReason": "Delivers hospital-grade air cleaning with real-time laser particle detection and silent night operation.",
    "pros": [
      "Noticeably eliminates cooking odors and dust within minutes",
      "Sleep mode is genuinely whisper-quiet",
      "Color-coded AQI LED ring gives instant air status"
    ],
    "cons": [
      "HEPA filter replacement recommended every 6-9 months"
    ],
    "bestUseCase": "Bedrooms, modern city apartments with high PM2.5, and homes with pets"
  }
];
  }
};
