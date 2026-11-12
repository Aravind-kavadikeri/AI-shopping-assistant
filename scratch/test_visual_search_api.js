const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let buf = '';
      res.on('data', chunk => buf += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch (e) { resolve(buf); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('Testing Visual Search API on localhost:3000...');

  // 1. Analyse endpoint
  const sampleBase64 = 'data:image/jpeg;base64,' + Buffer.from('fake-jpeg-binary-header').toString('base64');
  const analyseRes = await post('/api/visual-search/analyse.php', {
    image: sampleBase64,
    prompt: 'wireless white headphones'
  });
  console.log('1. Analyse Result:', analyseRes.status, 'Category:', analyseRes.analysis && analyseRes.analysis.category, 'Type:', analyseRes.analysis && analyseRes.analysis.product_type);

  // 2. Search endpoint with prompt
  const searchRes = await post('/api/visual-search/search.php', {
    image: sampleBase64,
    prompt: 'Find similar shoes under ₹4,000'
  });
  console.log('2. Search Result:', searchRes.status, 'Total matches:', searchRes.results_count);
  if (searchRes.results && searchRes.results.length > 0) {
    const top = searchRes.results[0];
    console.log('   Top Match:', top.name, '| Sim:', top.visual_similarity + '%', '| Price: ₹' + top.price);
  }

  // 3. History endpoint
  const httpGet = require('http');
  httpGet.get('http://127.0.0.1:3000/api/visual-search/history.php', res => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => {
      const hist = JSON.parse(b);
      console.log('3. History Result count:', hist.count);
    });
  });
}

run().catch(console.error);
