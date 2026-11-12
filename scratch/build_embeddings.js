/**
 * Visual Embedding Builder for ShopAI Catalog
 * Generates 64-dimensional normalized visual vectors for all 28 products
 */

const fs = require('fs');
const path = require('path');

const products = [
  {
    id: 1,
    name: "Apex Pro ANC Wireless Headphones",
    category: "Electronics",
    brand: "Apex Audio",
    type: "Over-Ear Wireless Headphones",
    dominantColors: ["White", "Silver", "Gray"],
    colorHex: ["#F3F4F6", "#9CA3AF", "#1F2937"],
    aspectRatio: 1.0,
    shape: "Dual circular earcups with curved arch headband",
    texture: "Acoustic memory foam, matte polymer, brushed aluminum",
    style: "Minimalist Modern",
    useCase: "Focus work, office commute, high-fidelity lossless listening",
    categoryIndex: 1, // Electronics
    colorDist: [0.15, 0.20, 0.25, 0.35, 0.02, 0.01, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 2,
    name: "AuraSound Spatial Wireless Earbuds",
    category: "Electronics",
    brand: "AuraSound",
    type: "In-Ear True Wireless Earbuds",
    dominantColors: ["White", "Glossy White"],
    colorHex: ["#FFFFFF", "#E5E7EB", "#D1D5DB"],
    aspectRatio: 0.9,
    shape: "Compact stem earbuds with rounded charging case",
    texture: "Glossy ceramic polymer, soft silicone ear tips",
    style: "Sleek Ultra-Compact",
    useCase: "Daily calls, workouts, spatial audio streaming",
    categoryIndex: 1,
    colorDist: [0.05, 0.10, 0.15, 0.70, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 3,
    name: "SoundWave Studio Monitor Bluetooth Speakers",
    category: "Electronics",
    brand: "SoundWave",
    type: "Bookshelf Studio Monitor Speakers",
    dominantColors: ["Matte Black", "Walnut Wood"],
    colorHex: ["#111827", "#78350F", "#374151"],
    aspectRatio: 1.25,
    shape: "Dual boxy rectangular speaker cabinets with circular driver cones",
    texture: "MDF wood veneer, woven Kevlar drivers, silk dome tweeters",
    style: "Acoustic Studio Professional",
    useCase: "Home studio monitoring, desktop audio, vinyl listening",
    categoryIndex: 1,
    colorDist: [0.55, 0.15, 0.05, 0.02, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.01, 0.0, 0.0, 0.05, 0.15]
  },
  {
    id: 4,
    name: "EchoSphere Smart Ambient Speaker",
    category: "Electronics",
    brand: "EchoSphere",
    type: "Spherical Smart Home Speaker",
    dominantColors: ["Charcoal Gray", "Teal Light Ring"],
    colorHex: ["#1F2937", "#168C91", "#4B5563"],
    aspectRatio: 1.0,
    shape: "Spherical globe with circular glowing LED base ring",
    texture: "Seamless acoustic 3D fabric mesh, anodized base ring",
    style: "Futuristic Minimalist",
    useCase: "Smart home assistant, room-filling 360-degree ambient audio",
    categoryIndex: 1,
    colorDist: [0.45, 0.30, 0.10, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 5,
    name: "Titanium Elite 16 Gaming & Workstation Laptop",
    category: "Laptops & Computers",
    brand: "Titan",
    type: "Performance Clamshell Workstation Laptop",
    dominantColors: ["Space Gray", "Matte Black", "Cyan Accents"],
    colorHex: ["#1E293B", "#0F172A", "#06B6D4"],
    aspectRatio: 1.5,
    shape: "Wide rectangular clamshell with 16-inch display lid and keyboard deck",
    texture: "CNC machined aluminum magnesium alloy, vapor chamber vents",
    style: "High-Performance Industrial",
    useCase: "3D rendering, machine learning compilation, AAA gaming",
    categoryIndex: 0, // Laptops & Computers
    colorDist: [0.50, 0.30, 0.10, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 6,
    name: "Zenith UltraSlim 15 Carbon Laptop",
    category: "Laptops & Computers",
    brand: "Zenith",
    type: "Ultra-Lightweight Carbon Fiber Laptop",
    dominantColors: ["Carbon Fiber Black", "Deep Teal"],
    colorHex: ["#123D46", "#111827", "#1E293B"],
    aspectRatio: 1.55,
    shape: "Featherlight slim wedge clamshell with 15.6-inch OLED panel",
    texture: "Woven multi-layer carbon fiber composite, ceramic matte finish",
    style: "Modern Minimalist Executive",
    useCase: "Full-stack programming, cloud architecture, travel computing",
    categoryIndex: 0,
    colorDist: [0.45, 0.20, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.02, 0.22, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 7,
    name: "AeroBook Pro 14 M-Series Ultrabook",
    category: "Laptops & Computers",
    brand: "AeroBook",
    type: "Unibody Aluminum Developer Ultrabook",
    dominantColors: ["Silver", "Space Gray"],
    colorHex: ["#E2E8F0", "#94A3B8", "#0F172A"],
    aspectRatio: 1.45,
    shape: "Precision symmetrical unibody rectangular clamshell with glass trackpad",
    texture: "Bead-blasted anodized 100% recycled aluminum, Liquid Retina glass",
    style: "Clean Precision Minimalist",
    useCase: "Software engineering, graphic UI design, all-day battery mobility",
    categoryIndex: 0,
    colorDist: [0.15, 0.35, 0.35, 0.12, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 8,
    name: "NovaBook Flip 2-in-1 Convertible Laptop",
    category: "Laptops & Computers",
    brand: "NovaBook",
    type: "360-Degree Convertible Touchscreen Laptop",
    dominantColors: ["Midnight Blue", "Platinum Silver"],
    colorHex: ["#1E3A8A", "#CBD5E1", "#0F172A"],
    aspectRatio: 1.4,
    shape: "Thin convertible rectangular chassis with dual 360-degree zinc hinges",
    texture: "Satin aerospace aluminum, edge-to-edge Gorilla Glass touch panel",
    style: "Versatile Creative Convertible",
    useCase: "Digital sketching, university lecture notes, tablet multimedia",
    categoryIndex: 0,
    colorDist: [0.20, 0.20, 0.20, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.15, 0.15, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 9,
    name: "AeroStride Quantum Running Shoes",
    category: "Footwear",
    brand: "AeroStride",
    type: "Road Marathon Carbon-Foam Running Shoes",
    dominantColors: ["Bright White", "Electric Cyan", "Coral Red"],
    colorHex: ["#FFFFFF", "#06B6D4", "#F07861"],
    aspectRatio: 1.8,
    shape: "Aerodynamic curved rocker shoe sole with low-cut collar",
    texture: "Engineered single-layer jacquard mesh, supercritical nitrogen foam",
    style: "Athletic Race Day",
    useCase: "Marathon racing, tempo runs, joint cushioning endurance",
    categoryIndex: 2, // Footwear
    colorDist: [0.05, 0.05, 0.10, 0.40, 0.12, 0.10, 0.0, 0.0, 0.0, 0.08, 0.10, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 10,
    name: "Vanguard Carbon Race Sneakers",
    category: "Footwear",
    brand: "Vanguard",
    type: "Carbon-Plated Elite Marathon Shoes",
    dominantColors: ["Neon Coral", "Volt Lime", "Black"],
    colorHex: ["#F07861", "#84CC16", "#18181B"],
    aspectRatio: 1.85,
    shape: "Aggressive curved rocker midsole with flared heel apex",
    texture: "Translucent monomesh, full-length curved carbon fiber propulsion plate",
    style: "Elite Competition Athletic",
    useCase: "Personal record half and full marathons, interval sprints",
    categoryIndex: 2,
    colorDist: [0.15, 0.05, 0.02, 0.08, 0.25, 0.25, 0.05, 0.12, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 11,
    name: "TerraClaw Trail Grip Running Shoes",
    category: "Footwear",
    brand: "TerraGuard",
    type: "Lugged Mountain Trail Running Shoes",
    dominantColors: ["Olive Green", "Earth Brown", "Safety Orange"],
    colorHex: ["#3F6212", "#78350F", "#F97316"],
    aspectRatio: 1.75,
    shape: "Reinforced low-top trail shoe with protective rubber toe rand",
    texture: "Ripstop ballistic mesh, 5mm multidirectional chevron rubber lugs",
    style: "Rugged Mountain Trail",
    useCase: "Muddy single-track trails, rocky ridge running, technical scrambles",
    categoryIndex: 2,
    colorDist: [0.15, 0.10, 0.05, 0.02, 0.05, 0.10, 0.05, 0.08, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.10]
  },
  {
    id: 12,
    name: "StreetGlide Retro Leather Low Sneakers",
    category: "Footwear",
    brand: "StreetGlide",
    type: "Heritage Low-Top Lifestyle Sneakers",
    dominantColors: ["Vintage Off-White", "Gum Sole Brown"],
    colorHex: ["#F9FAFB", "#D97706", "#9CA3AF"],
    aspectRatio: 1.7,
    shape: "Classic low-cut tennis silhouette with clean stitched overlays",
    texture: "Full-grain tumbled nappa leather, natural gum rubber cupsole",
    style: "Heritage Vintage Casual",
    useCase: "Smart casual office, weekend urban lifestyle, relaxed daily wear",
    categoryIndex: 2,
    colorDist: [0.05, 0.10, 0.15, 0.50, 0.0, 0.02, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.10]
  },
  {
    id: 13,
    name: "TerraGuard Waterproof Alpine Jacket",
    category: "Outdoor Gear",
    brand: "TerraGuard",
    type: "3-Layer Waterproof Alpine Hardshell Jacket",
    dominantColors: ["Deep Teal", "Coral Accents", "Charcoal"],
    colorHex: ["#123D46", "#F07861", "#1E293B"],
    aspectRatio: 0.85,
    shape: "Torso apparel jacket with articulated sleeves and helmet-compatible hood",
    texture: "3-Layer 20,000mm waterproof breathable Gore-Tex shell, taped seams",
    style: "Alpine Technical Mountaineering",
    useCase: "Monsoon trekking, high-altitude alpine hiking, torrential storm protection",
    categoryIndex: 3, // Outdoor Gear
    colorDist: [0.20, 0.15, 0.05, 0.02, 0.05, 0.12, 0.0, 0.0, 0.05, 0.32, 0.04, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 14,
    name: "StormShield Pro Mountain Parka",
    category: "Outdoor Gear",
    brand: "StormShield",
    type: "Insulated Heavy-Duty Expedition Parka",
    dominantColors: ["Matte Black", "Graphite"],
    colorHex: ["#0F172A", "#1E293B", "#334155"],
    aspectRatio: 0.8,
    shape: "Longer-cut parka silhouette with high storm collar and insulated hood",
    texture: "DWR windproof ripstop nylon, 800-fill responsible goose down insulation",
    style: "Rugged Cold-Weather Expedition",
    useCase: "Sub-zero mountain expeditions, winter Himalayan tours, extreme cold",
    categoryIndex: 3,
    colorDist: [0.65, 0.20, 0.08, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 15,
    name: "SummitLite Packable Windbreaker",
    category: "Outdoor Gear",
    brand: "SummitLite",
    type: "Ultralight Packable Trail Wind Jacket",
    dominantColors: ["Vibrant Solar Yellow", "Black"],
    colorHex: ["#EAB308", "#18181B", "#CA8A04"],
    aspectRatio: 0.88,
    shape: "Featherweight fitted runner jacket with elastic cuffs and hood",
    texture: "15D ultralight windproof ripstop nylon, water-repellent DWR coating",
    style: "High-Visibility Trail Athletic",
    useCase: "Morning trail runs, windy ridge trekking, emergency pocket shelter",
    categoryIndex: 3,
    colorDist: [0.20, 0.10, 0.02, 0.01, 0.0, 0.08, 0.52, 0.04, 0.02, 0.0, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 16,
    name: "AlpineTrek Carbon Fiber Trekking Poles",
    category: "Outdoor Gear",
    brand: "AlpineTrek",
    type: "Tri-Fold Carbon Fiber Hiking Poles",
    dominantColors: ["Matte Carbon Black", "Natural Cork"],
    colorHex: ["#18181B", "#B45309", "#9CA3AF"],
    aspectRatio: 0.35,
    shape: "Slim vertical segmented telescoping poles with ergonomic handgrips",
    texture: "100% 3K carbon fiber shafts, natural moisture-wicking Portuguese cork",
    style: "Technical Backcountry Trekking",
    useCase: "Knee joint relief on steep descents, balance across scree and rivers",
    categoryIndex: 3,
    colorDist: [0.55, 0.15, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.18]
  },
  {
    id: 17,
    name: "EchoGrip Classic White Canvas Sneakers",
    category: "Footwear",
    brand: "EchoGrip",
    type: "Low-Top Casual Canvas Sneakers",
    dominantColors: ["Pure White", "Off-White"],
    colorHex: ["#FFFFFF", "#F3F4F6", "#D1D5DB"],
    aspectRatio: 1.7,
    shape: "Clean minimalist low-top sneaker profile with vulcanized sidewalls",
    texture: "Heavyweight 12oz organic cotton canvas, ortholite memory foam insole",
    style: "Timeless Minimalist Casual",
    useCase: "College campus, everyday casual streetwear, city walking",
    categoryIndex: 2,
    colorDist: [0.02, 0.05, 0.12, 0.78, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.01]
  },
  {
    id: 18,
    name: "TerraClimb Vibram Waterproof Hiking Boots",
    category: "Footwear",
    brand: "TerraGuard",
    type: "Mid-Cut Vibram Mountain Trekking Boots",
    dominantColors: ["Earth Brown", "Matte Black", "Gunmetal"],
    colorHex: ["#78350F", "#18181B", "#4B5563"],
    aspectRatio: 1.6,
    shape: "Substantial mid-cut boot with high-ankle collar and heavy mud lugs",
    texture: "Oiled nubuck leather, Vibram Megagrip compound, waterproof bootie",
    style: "Heavy-Duty Mountain Trekking",
    useCase: "Monsoon treks, rocky scrambles, multiday heavy load backpacking",
    categoryIndex: 2,
    colorDist: [0.35, 0.15, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10, 0.31]
  },
  {
    id: 19,
    name: "Nordic Minimalist Waterproof Laptop Backpack",
    category: "Bags & Accessories",
    brand: "Nordic Carry",
    type: "Boxy Minimalist Commuter Backpack",
    dominantColors: ["Matte Charcoal Black", "Deep Teal"],
    colorHex: ["#18181B", "#123D46", "#374151"],
    aspectRatio: 0.75,
    shape: "Clean rectangular boxy backpack with top zip and ergonomic shoulder straps",
    texture: "Weather-resistant matte polyurethane, 900D Oxford nylon, fleece lining",
    style: "Scandinavian Minimalist Urban",
    useCase: "Tech office commute, college classes, domestic flight carry-on",
    categoryIndex: 4, // Bags & Accessories
    colorDist: [0.60, 0.18, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 20,
    name: "AeroSling Urban Tech Crossbody Pack",
    category: "Bags & Accessories",
    brand: "AeroCarry",
    type: "Compact Tech Sling Crossbody Bag",
    dominantColors: ["Heather Charcoal", "Black"],
    colorHex: ["#374151", "#111827", "#9CA3AF"],
    aspectRatio: 1.3,
    shape: "Streamlined horizontal wedge sling with diagonal strap and magnetic buckle",
    texture: "Cordura ballistic nylon, water-repellent YKK aquaguard zippers",
    style: "Urban Techwear Minimalist",
    useCase: "Hands-free phone/keys/tablet carry, airport transit, bike commute",
    categoryIndex: 4,
    colorDist: [0.45, 0.35, 0.15, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 21,
    name: "Voyager 45L Water-Resistant Expandable Travel Duffel",
    category: "Bags & Accessories",
    brand: "Voyager",
    type: "Expandable Weekender Travel Duffel",
    dominantColors: ["Matte Black", "Navy Blue"],
    colorHex: ["#0F172A", "#1E3A8A", "#334155"],
    aspectRatio: 1.6,
    shape: "Spacious cylindrical barrel duffel with stowable backpack shoulder straps",
    texture: "Heavyweight 1000D weatherproof tarpaulin, reinforced webbed handles",
    style: "Rugged Travel Adventure",
    useCase: "Weekend getaways, gym workout gear, 3-5 day travel expeditions",
    categoryIndex: 4,
    colorDist: [0.50, 0.15, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.12, 0.10, 0.0, 0.0, 0.0, 0.01]
  },
  {
    id: 22,
    name: "ModuCase Magnetic Tech Organizer & Cable Pouch",
    category: "Bags & Accessories",
    brand: "ModuCase",
    type: "Accordion Electronics Cable Pouch",
    dominantColors: ["Melange Heather Gray", "Orange Pulls"],
    colorHex: ["#4B5563", "#F97316", "#9CA3AF"],
    aspectRatio: 1.4,
    shape: "Compact folding organizer pouch with accordion fold-out interior",
    texture: "Water-repellent 600D polyester, elastic retention loops, mesh pockets",
    style: "Functional Modular Tech Organizer",
    useCase: "Organizing charging bricks, cables, mice, and memory cards inside backpack",
    categoryIndex: 4,
    colorDist: [0.25, 0.35, 0.25, 0.03, 0.01, 0.08, 0.01, 0.0, 0.0, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 23,
    name: "PulseSync Titanium AMOLED Smartwatch",
    category: "Wearables",
    brand: "PulseSync",
    type: "Circular Titanium Sports Smartwatch",
    dominantColors: ["Titanium Silver", "Matte Black"],
    colorHex: ["#94A3B8", "#0F172A", "#E2E8F0"],
    aspectRatio: 1.0,
    shape: "Circular watch dial with bezel markers and textured fluoroelastomer band",
    texture: "Grade 5 titanium alloy case, bright AMOLED glass, silicone strap",
    style: "Executive Sports Luxury",
    useCase: "Continuous biometrics, Bluetooth calls, GPS workout recording",
    categoryIndex: 5, // Wearables
    colorDist: [0.35, 0.30, 0.25, 0.05, 0.0, 0.01, 0.0, 0.0, 0.0, 0.01, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 24,
    name: "AuraFit Pro AMOLED Health & Sleep Tracker Band",
    category: "Wearables",
    brand: "AuraFit",
    type: "Slim Curved AMOLED Fitness Tracker Band",
    dominantColors: ["Midnight Black", "Obsidian"],
    colorHex: ["#111827", "#1F2937", "#374151"],
    aspectRatio: 0.55,
    shape: "Ultra-slim elongated pill-shaped vertical display with integrated strap",
    texture: "Curved 2.5D glass, featherlight skin-friendly silicone band (24g)",
    style: "Discreet Minimalist Wellness",
    useCase: "All-night REM sleep monitoring, daily step counts, discreet notifications",
    categoryIndex: 5,
    colorDist: [0.65, 0.22, 0.08, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 25,
    name: "Chronos Elite Sapphire GPS Multi-Sport Watch",
    category: "Wearables",
    brand: "Chronos",
    type: "Rugged Expedition Sapphire GPS Watch",
    dominantColors: ["Gunmetal Gray", "Black", "Safety Orange"],
    colorHex: ["#1E293B", "#334155", "#EA580C"],
    aspectRatio: 1.0,
    shape: "Rugged circular titanium bezel with reinforced screw studs and knurled buttons",
    texture: "Unscratchable sapphire crystal face, Grade 5 titanium, rugged silicone",
    style: "Rugged Expedition Tactical",
    useCase: "Backcountry navigation, ultra-marathons, mountaineering GPS topo maps",
    categoryIndex: 5,
    colorDist: [0.45, 0.30, 0.12, 0.02, 0.02, 0.06, 0.0, 0.0, 0.0, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 26,
    name: "Lumina Ambient Dynamic Screenbar & Desk Lamp",
    category: "Smart Living",
    brand: "Lumina",
    type: "Monitor-Mounted Asymmetric Screenbar Lamp",
    dominantColors: ["Anodized Matte Black", "Warm Light Glow"],
    colorHex: ["#18181B", "#27272A", "#FDE047"],
    aspectRatio: 3.5,
    shape: "Long horizontal slim cylindrical light tube with weighted monitor clamp",
    texture: "Anodized sandblasted aluminum alloy, anti-glare optical prism lens",
    style: "Clean Minimalist Desk Setup",
    useCase: "Late night coding, reading without screen glare, workspace illumination",
    categoryIndex: 6, // Smart Living
    colorDist: [0.55, 0.20, 0.05, 0.02, 0.0, 0.02, 0.12, 0.0, 0.0, 0.02, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 27,
    name: "MagGrid 3-in-1 Fast Wireless Charging Station",
    category: "Smart Living",
    brand: "MagGrid",
    type: "Folding Magnetic 3-Device Wireless Charging Dock",
    dominantColors: ["Pure White", "Silver Chrome Accents"],
    colorHex: ["#FFFFFF", "#F3F4F6", "#CBD5E1"],
    aspectRatio: 1.2,
    shape: "Clean folding multi-tier stand with magnetic circular pad and watch cradle",
    texture: "Smooth matte silicone pad, weighted zinc alloy folding hinges",
    style: "Minimalist Clutter-Free Desk",
    useCase: "Simultaneously powers phone, smartwatch, and wireless earbuds cleanly",
    categoryIndex: 6,
    colorDist: [0.05, 0.10, 0.20, 0.62, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0]
  },
  {
    id: 28,
    name: "ErgoRest Solid Walnut Ergonomic Keyboard Palm Rest",
    category: "Smart Living",
    brand: "ErgoRest",
    type: "Solid Black Walnut Keyboard Wrist Rest",
    dominantColors: ["Natural Walnut Brown", "Deep Wood Grain"],
    colorHex: ["#78350F", "#92400E", "#451A03"],
    aspectRatio: 4.2,
    shape: "Long horizontal beveled rectangular solid wooden slab with 8-degree incline",
    texture: "100% genuine North American black walnut, silky beeswax oil finish",
    style: "Natural Artisan Ergonomic",
    useCase: "Prevents wrist extension fatigue during typing and long coding sessions",
    categoryIndex: 6,
    colorDist: [0.15, 0.05, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.62]
  }
];

// Generate 64-dimensional normalized vector for each product
function generateVector(p) {
  const vec = new Array(64).fill(0);

  // Dimensions 0-15: 16-bin normalized color distribution
  for (let i = 0; i < 16; i++) {
    vec[i] = p.colorDist[i] || 0.0;
  }

  // Dimensions 16-31: Shape, aspect ratio & compactness profile
  const asp = p.aspectRatio;
  vec[16] = Math.min(1.0, asp / 3.0); // Aspect ratio normalized
  vec[17] = asp > 1.2 ? 0.8 : (asp < 0.8 ? 0.2 : 0.5); // Landscape vs portrait orientation
  vec[18] = p.shape.includes('circular') ? 0.9 : 0.1;
  vec[19] = p.shape.includes('rectangular') ? 0.9 : 0.1;
  vec[20] = p.shape.includes('clamshell') ? 0.95 : 0.0;
  vec[21] = p.shape.includes('rocker') || p.shape.includes('shoe') ? 0.95 : 0.0;
  vec[22] = p.shape.includes('jacket') || p.shape.includes('apparel') ? 0.95 : 0.0;
  vec[23] = p.shape.includes('backpack') || p.shape.includes('pouch') ? 0.95 : 0.0;
  vec[24] = p.shape.includes('watch') || p.shape.includes('dial') ? 0.95 : 0.0;
  vec[25] = p.shape.includes('horizontal') || p.shape.includes('slab') ? 0.9 : 0.1;
  vec[26] = p.type.includes('Wireless') || p.type.includes('Headphones') ? 0.85 : 0.05;
  vec[27] = p.type.includes('Laptop') || p.type.includes('Ultrabook') ? 0.85 : 0.05;
  vec[28] = p.type.includes('Sneakers') || p.type.includes('Running') || p.type.includes('Boots') ? 0.85 : 0.05;
  vec[29] = p.type.includes('Jacket') || p.type.includes('Windbreaker') || p.type.includes('Parka') ? 0.85 : 0.05;
  vec[30] = p.type.includes('Pack') || p.type.includes('Backpack') || p.type.includes('Duffel') ? 0.85 : 0.05;
  vec[31] = p.type.includes('Watch') || p.type.includes('Band') ? 0.85 : 0.05;

  // Dimensions 32-47: Material & Texture profile
  vec[32] = p.texture.includes('aluminum') || p.texture.includes('titanium') ? 0.9 : 0.1; // Metallic
  vec[33] = p.texture.includes('mesh') || p.texture.includes('textile') || p.texture.includes('fabric') ? 0.9 : 0.1; // Woven
  vec[34] = p.texture.includes('carbon') ? 0.95 : 0.05; // Carbon fiber
  vec[35] = p.texture.includes('leather') ? 0.95 : 0.05; // Leather
  vec[36] = p.texture.includes('foam') || p.texture.includes('silicone') ? 0.9 : 0.1; // Cushion / soft
  vec[37] = p.texture.includes('wood') || p.texture.includes('walnut') || p.texture.includes('cork') ? 0.95 : 0.05; // Wood grain
  vec[38] = p.texture.includes('waterproof') || p.texture.includes('Gore-Tex') || p.texture.includes('DWR') ? 0.95 : 0.05; // Weatherproof
  vec[39] = p.texture.includes('glass') || p.texture.includes('OLED') || p.texture.includes('sapphire') ? 0.9 : 0.05; // Glass / display
  vec[40] = p.style.includes('Minimalist') ? 0.8 : 0.2;
  vec[41] = p.style.includes('Athletic') || p.style.includes('Competition') ? 0.9 : 0.1;
  vec[42] = p.style.includes('Alpine') || p.style.includes('Rugged') || p.style.includes('Expedition') ? 0.9 : 0.1;
  vec[43] = p.style.includes('Executive') || p.style.includes('Luxury') ? 0.85 : 0.15;
  vec[44] = p.useCase.includes('commute') ? 0.75 : 0.2;
  vec[45] = p.useCase.includes('marathon') || p.useCase.includes('workout') ? 0.85 : 0.1;
  vec[46] = p.useCase.includes('trekking') || p.useCase.includes('mountain') ? 0.85 : 0.1;
  vec[47] = p.useCase.includes('programming') || p.useCase.includes('desk') ? 0.85 : 0.1;

  // Dimensions 48-63: Semantic Category & Intent weights
  // Category one-hot (dim 48 to 54)
  vec[48 + p.categoryIndex] = 1.0;
  // Sub-category intent anchors
  vec[55] = p.category === 'Laptops & Computers' ? 0.9 : 0.05;
  vec[56] = p.category === 'Electronics' ? 0.9 : 0.05;
  vec[57] = p.category === 'Footwear' ? 0.9 : 0.05;
  vec[58] = p.category === 'Outdoor Gear' ? 0.9 : 0.05;
  vec[59] = p.category === 'Bags & Accessories' ? 0.9 : 0.05;
  vec[60] = p.category === 'Wearables' ? 0.9 : 0.05;
  vec[61] = p.category === 'Smart Living' ? 0.9 : 0.05;
  vec[62] = p.dominantColors.includes('White') ? 0.8 : (p.dominantColors.includes('Black') ? 0.2 : 0.5);
  vec[63] = 1.0; // Bias term

  // L2 Normalization so ||vec|| = 1.0
  let sumSq = 0;
  for (let i = 0; i < 64; i++) sumSq += vec[i] * vec[i];
  const mag = Math.sqrt(sumSq) || 1.0;
  const normalized = vec.map(val => parseFloat((val / mag).toFixed(5)));

  return normalized;
}

const catalogWithEmbeddings = products.map(p => {
  const embedding = generateVector(p);
  return {
    ...p,
    embedding
  };
});

const outputPath = path.join(__dirname, '..', 'database', 'catalog_embeddings.json');
fs.writeFileSync(outputPath, JSON.stringify(catalogWithEmbeddings, null, 2), 'utf8');
console.log('Successfully generated catalog_embeddings.json with ' + catalogWithEmbeddings.length + ' products.');
