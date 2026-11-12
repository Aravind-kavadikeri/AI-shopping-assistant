/**
 * Automated Verification Suite for Smart Shopping Portal Splash & Auth Gateway
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

function get(pathUrl) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + pathUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

function post(pathUrl, bodyObj) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(bodyObj);
    const req = http.request(BASE_URL + pathUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('======================================================');
  console.log('🧪 Starting Smart Shopping Portal & Auth Gateway Tests');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(desc, condition, extra = '') {
    if (condition) {
      console.log(`  ✅ [PASS] ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${desc} ${extra}`);
      failed++;
    }
  }

  // 1. Static asset verification
  console.log('--- 1. Static Assets & 3D Three.js Verification ---');
  const indexRes = await get('/');
  assert('index.html returns HTTP 200', indexRes.statusCode === 200);
  assert('index.html contains portal-splash container', indexRes.body.includes('id="splash-screen"') && indexRes.body.includes('portal-splash'));
  assert('index.html contains splash-canvas-container', indexRes.body.includes('id="splash-canvas-container"'));
  assert('index.html contains AI SHOPPING ASSISTANT brand title', indexRes.body.includes('AI SHOPPING ASSISTANT') || indexRes.body.includes('AI <span style="font-weight: 500; color: #FFFFFF;">SHOPPING</span>'));
  assert('index.html references three.min.js', indexRes.body.includes('assets/js/vendor/three.min.js'));
  assert('index.html references portal-splash.js', indexRes.body.includes('assets/js/portal-splash.js'));

  const threeRes = await get('/assets/js/vendor/three.min.js');
  assert('three.min.js served cleanly (HTTP 200, >500KB)', threeRes.statusCode === 200 && threeRes.body.length > 500000);

  const splashJsRes = await get('/assets/js/portal-splash.js');
  assert('portal-splash.js served cleanly (HTTP 200)', splashJsRes.statusCode === 200 && splashJsRes.body.includes('PortalSplash'));
  assert('portal-splash.js constructs 4 products (laptop, smartphone, headphones, sneaker)', 
    splashJsRes.body.includes('laptop') && 
    splashJsRes.body.includes('smartphone') && 
    splashJsRes.body.includes('headphones') && 
    splashJsRes.body.includes('sneaker'));

  const logoRes = await get('/assets/images/logo.svg');
  assert('logo.svg served cleanly (HTTP 200, valid SVG)', logoRes.statusCode === 200 && logoRes.body.includes('<svg') && logoRes.body.includes('#F07861'));

  // 2. CSS Check
  console.log('\n--- 2. Design System & Splash CSS Verification ---');
  const cssRes = await get('/assets/css/glassmorphism.css');
  assert('glassmorphism.css includes .portal-splash', cssRes.body.includes('.portal-splash'));
  assert('glassmorphism.css includes #splash-brand-reveal', cssRes.body.includes('#splash-brand-reveal'));
  assert('glassmorphism.css includes .auth-gate-card', cssRes.body.includes('.auth-gate-card'));

  // 3. API & Authentication Verification
  console.log('\n--- 3. Backend REST APIs & Grounded Personas Verification ---');
  
  // Test login with Aravind
  const loginAravind = await post('/api/login.php', { identifier: 'aravind', password: 'password123' });
  const aravindData = JSON.parse(loginAravind.body);
  assert('Login with "aravind" / "password123" succeeds', aravindData.status === 'success' && aravindData.user.name === 'Aravind Sharma');

  // Test login with Priya
  const loginPriya = await post('/api/login.php', { identifier: 'priya', password: 'password123' });
  const priyaData = JSON.parse(loginPriya.body);
  assert('Login with "priya" / "password123" succeeds', priyaData.status === 'success' && priyaData.user.name === 'Priya Patel');

  // Test login with Rajesh (Merchant Admin)
  const loginRajesh = await post('/api/login.php', { identifier: 'admin', password: 'admin123' });
  const rajeshData = JSON.parse(loginRajesh.body);
  assert('Login with "admin" / "admin123" succeeds as merchant', rajeshData.status === 'success' && rajeshData.user.role === 'merchant');

  // Test registration
  const testRegUser = 'testuser_' + Date.now();
  const regRes = await post('/api/register.php', {
    name: 'Maya Test',
    username: testRegUser,
    email: `${testRegUser}@example.com`,
    password: 'password123',
    category: 'Electronics',
    budgetCap: 60000
  });
  const regData = JSON.parse(regRes.body);
  assert('Registration creates a new user profile cleanly', regData.status === 'success' && regData.user.name === 'Maya Test');

  // 4. Products & Analytics parity
  console.log('\n--- 4. Catalog Products & Analytics Verification ---');
  const prodRes = await get('/api/products.php');
  const prodData = JSON.parse(prodRes.body);
  assert('Products API returns catalog (28 items)', Array.isArray(prodData.products) && prodData.products.length >= 28);

  const analyticsRes = await get('/api/analytics.php?date_range=7d');
  const analyticsData = JSON.parse(analyticsRes.body);
  assert('Analytics API returns dynamic KPIs', analyticsData.kpis && analyticsData.kpis.total_revenue > 0);

  console.log('\n======================================================');
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test run failed with error:', err);
  process.exit(1);
});
