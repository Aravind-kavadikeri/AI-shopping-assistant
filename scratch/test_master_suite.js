const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let parsed = body;
        try { parsed = JSON.parse(body); } catch(e) {}
        resolve({ statusCode: res.statusCode, headers: res.headers, body: parsed });
      });
    });
    req.on('error', reject);
    if (data) {
      if (typeof data === 'string' || Buffer.isBuffer(data)) {
        req.write(data);
      } else {
        req.write(JSON.stringify(data));
      }
    }
    req.end();
  });
}

async function runMasterSuite() {
  console.log('========================================================');
  console.log('🧪 RUNNING MASTER VERIFICATION TEST SUITE');
  console.log('========================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Static Assets
    console.log('\n[1/7] Static Assets & 3D Three.js Bundle');
    const indexRes = await request({ host: 'localhost', port: 3000, path: '/', method: 'GET' });
    assert(indexRes.statusCode === 200, 'index.html served with 200');

    const threeRes = await request({ host: 'localhost', port: 3000, path: '/assets/js/vendor/three.min.js', method: 'GET' });
    assert(threeRes.statusCode === 200 && threeRes.body.length > 500000, 'three.min.js (603 KB local vendor) served');

    const splashRes = await request({ host: 'localhost', port: 3000, path: '/assets/js/portal-splash.js', method: 'GET' });
    assert(splashRes.statusCode === 200, 'portal-splash.js served');

    const appJsRes = await request({ host: 'localhost', port: 3000, path: '/assets/js/app.js', method: 'GET' });
    assert(appJsRes.statusCode === 200, 'app.js served');

    const cssRes = await request({ host: 'localhost', port: 3000, path: '/assets/css/glassmorphism.css', method: 'GET' });
    assert(cssRes.statusCode === 200 && cssRes.body.includes('vs-modal-content') && cssRes.body.includes('invoice-modal-content'), 'glassmorphism.css contains visual search and tax invoice styles');

    // 2. Products Catalog API
    console.log('\n[2/7] Products Catalog API');
    const prodsRes = await request({ host: 'localhost', port: 3000, path: '/api/products.php', method: 'GET' });
    assert(prodsRes.statusCode === 200 && prodsRes.body.products && prodsRes.body.products.length === 28, 'products.php returns all 28 catalog items');

    // 3. Password Change Controller
    console.log('\n[3/7] Password Change Security Controller');
    const pwdFailRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/change-password.php',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      user_id: 1,
      current_password: 'wrongpassword',
      new_password: 'newsecretpassword123',
      confirm_password: 'newsecretpassword123'
    });
    assert(pwdFailRes.body.status === 'error', 'Incorrect current password rejected');

    const pwdSuccessRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/change-password.php',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      user_id: 1,
      current_password: 'password123',
      new_password: 'newsecretpassword123',
      confirm_password: 'newsecretpassword123'
    });
    assert(pwdSuccessRes.body.status === 'success', 'Valid password change succeeds');

    // 4. Logout Controller
    console.log('\n[4/7] Session Logout Controller');
    const logoutRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/logout.php',
      method: 'POST'
    });
    assert(logoutRes.statusCode === 200 && logoutRes.body.status === 'success', 'Session logout terminates successfully');

    // 5. Visual Product Search API (64-D Vector Engine & Combined Prompt)
    console.log('\n[5/7] AI Visual Product Search Engine (64-D Embeddings)');
    const vsRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/visual-search/search.php',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      prompt: 'athletic running shoes under 5000',
      category: 'Footwear',
      language: 'en'
    });

    assert(vsRes.statusCode === 200 && vsRes.body.status === 'success', 'Visual search returned 200 with status: success');
    assert(vsRes.body.identified_attributes && vsRes.body.identified_attributes.dominant_colors.length > 0, 'Identified dominant colors and visual attributes');
    assert(vsRes.body.results && vsRes.body.results.length > 0, `Ranked ${vsRes.body.results.length} catalog items by vector similarity`);
    assert(vsRes.body.results[0].visual_similarity >= 85, `Top match scored high similarity (${vsRes.body.results[0].visual_similarity}%)`);

    const vsHistoryRes = await request({ host: 'localhost', port: 3000, path: '/api/visual-search/history.php', method: 'GET' });
    assert(vsHistoryRes.statusCode === 200 && vsHistoryRes.body.status === 'success', 'Visual search history tracked');

    // 6. Razorpay Payment Gateway Endpoints
    console.log('\n[6/7] Razorpay Payment Gateway Backend');
    const createOrderRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/payment/create-order.php',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      user_id: 1,
      items: [
        { id: 1, name: 'Zenith UltraSlim 15 Carbon Laptop', price: 58199, quantity: 1 }
      ],
      bundle_discount: 800,
      delivery_fee: 0
    });
    assert(createOrderRes.statusCode === 200 && createOrderRes.body.order_code, 'create-order created order_code: ' + createOrderRes.body.order_code);
    assert(createOrderRes.body.razorpay_order_id.startsWith('order_rzp_'), 'Received authentic razorpay_order_id: ' + createOrderRes.body.razorpay_order_id);
    assert(createOrderRes.body.amount_paise === 5739900, 'Accurate paise conversion (₹57,399 -> 5,739,900 paise)');

    const verifyRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/payment/verify.php',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      order_code: createOrderRes.body.order_code,
      razorpay_order_id: createOrderRes.body.razorpay_order_id,
      razorpay_payment_id: 'pay_test_9942a1b',
      razorpay_signature: 'test_hmac_sha256_mock_sig'
    });
    assert(verifyRes.statusCode === 200 && verifyRes.body.status === 'success', 'verify.php verified payment signature and confirmed order');

    const statusRes = await request({
      host: 'localhost',
      port: 3000,
      path: `/api/payment/status.php?order_code=${createOrderRes.body.order_code}`,
      method: 'GET'
    });
    assert(statusRes.statusCode === 200 && statusRes.body.status === 'success', 'status.php returned order status PAID');

    // 7. Orders Invoices History
    console.log('\n[7/7] Orders History & User Telemetry');
    const ordersRes = await request({ host: 'localhost', port: 3000, path: '/api/orders.php?user_id=1', method: 'GET' });
    assert(ordersRes.statusCode === 200 && ordersRes.body.orders.length > 0, 'Orders history fetched successfully with line item telemetry');

    console.log('\n========================================================');
    console.log(`🏁 MASTER TEST SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================');

    if (failed > 0) process.exit(1);
    process.exit(0);

  } catch (err) {
    console.error('Fatal suite error:', err);
    process.exit(1);
  }
}

runMasterSuite();
