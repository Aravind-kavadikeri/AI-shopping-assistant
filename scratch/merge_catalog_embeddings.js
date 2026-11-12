const fs = require('fs');
const path = require('path');

const storeContent = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'store.js'), 'utf8');
const prodsMatch = storeContent.match(/getDefaultProducts\(\)\s*\{\s*return\s*(\[[\s\S]*?\n\s*\]);/);

if (!prodsMatch) {
  console.error("Could not find getDefaultProducts in store.js");
  process.exit(1);
}

let rawCatalog = eval(prodsMatch[1]);
console.log("Loaded raw catalog products:", rawCatalog.length);

const existingEmbeddings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'database', 'catalog_embeddings.json'), 'utf8'));
const embeddingMap = new Map();
existingEmbeddings.forEach(e => embeddingMap.set(e.id, e));

const merged = rawCatalog.map(p => {
  const emb = embeddingMap.get(p.id) || {};
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    brand: emb.brand || (p.name.split(' ')[0]),
    price: p.price,
    originalPrice: p.originalPrice || Math.round(p.price * 1.35),
    rating: p.rating || 4.7,
    reviewsCount: p.reviewsCount || 150,
    stock: p.stock || 30,
    stockStatus: p.stockStatus || 'In Stock',
    viewsCount: p.viewsCount || 200,
    imageUrl: p.imageUrl,
    description: p.description,
    features: p.features || [],
    specs: p.specs || {},
    tags: p.tags || '',
    type: emb.type || p.category,
    dominantColors: emb.dominantColors || ["Black", "Silver"],
    colorHex: emb.colorHex || ["#1E293B", "#94A3B8"],
    aspectRatio: emb.aspectRatio || 1.0,
    shape: emb.shape || "Symmetrical ergonomic hardware",
    texture: emb.texture || "Matte polymer, anodized aluminum",
    style: emb.style || "Minimalist Modern",
    useCase: emb.useCase || p.bestUseCase || "Everyday use",
    embedding: emb.embedding
  };
});

fs.writeFileSync(path.join(__dirname, '..', 'database', 'catalog_embeddings.json'), JSON.stringify(merged, null, 2), 'utf8');
console.log("Merged catalog embeddings written successfully. Total items:", merged.length);
