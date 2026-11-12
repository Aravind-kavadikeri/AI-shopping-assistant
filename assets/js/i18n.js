/**
 * =========================================================================
 * AI SHOPPING ASSISTANT — MULTILINGUAL ENGINE (I18N)
 * Supported Languages: English (en), Kannada (kn), Hindi (hi), Tamil (ta), Telugu (te), Malayalam (ml)
 * Native Language Selectors • Dynamic UI Translation • Multilingual AI Copilot
 * =========================================================================
 */

const I18n = {
  currentLang: localStorage.getItem('shopai_language') || 'en',

  languages: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
  ],

  translations: {
    en: {
      appName: 'AI Shopping Assistant',
      tagline: 'Shopping, Reimagined by AI.',
      home: 'Home',
      discover: 'Discover',
      assistant: 'AI Assistant',
      deals: 'Deals',
      ordersProfile: 'Orders & Profile',
      cart: 'Cart',
      compare: 'Compare',
      wishlist: 'Wishlist',
      adminDashboard: 'Admin Dashboard',
      merchantDashboard: 'Merchant Dashboard',
      searchPlaceholder: 'Search products, categories, or natural constraints (e.g. laptop under ₹60,000)...',
      aiCopilotPlaceholder: 'Ask your AI Shopping Copilot anything...',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      reviews: 'Reviews',
      rating: 'Rating',
      price: 'Price',
      originalPrice: 'Original Price',
      saveAmount: 'Save',
      customerPortal: 'Customer Portal',
      customerDesc: 'Discover products, get AI recommendations and manage your shopping.',
      adminPortal: 'Administrator Portal',
      adminDesc: 'Manage products, users, inventory, orders and business analytics.',
      customerLogin: 'Customer Login',
      createAccount: 'Create Customer Account',
      adminLogin: 'Admin Login',
      logout: 'Logout',
      logoutSuccess: 'Signed out successfully.',
      welcomeUser: 'Welcome back, {name}!',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      discount: 'Discount',
      taxGst: 'Tax (GST 18%)',
      shipping: 'Shipping Charges',
      freeShipping: 'FREE',
      totalPayable: 'Total Payable',
      proceedToPayment: 'Proceed to Payment',
      payWithRazorpay: 'Pay with Razorpay (Cards, UPI, Netbanking)',
      paymentSuccess: 'Payment Successful! Order Confirmed.',
      paymentFailed: 'Payment Failed or Cancelled. You can retry safely.',
      orderHistory: 'My Orders',
      statusPaid: 'PAID',
      statusPending: 'PENDING',
      statusFailed: 'FAILED',
      editProfile: 'Edit Profile',
      changePassword: 'Change Password',
      preferredLanguage: 'Preferred Language',
      saveChanges: 'Save Changes',
      kpiTotalRevenue: 'Total Revenue',
      kpiTotalOrders: 'Total Orders',
      kpiAov: 'Average Order Value (AOV)',
      kpiTotalCustomers: 'Total Customers',
      kpiProductsSold: 'Products Sold',
      kpiConversionRate: 'Conversion Rate',
      priceIntelligence: 'Price Intelligence',
      smartBundle: 'AI Smart Bundle',
      aiScoreExplain: '5-Factor Weighted Score Breakdown',
      voiceSearch: 'Voice Search',
      imageSearch: 'Image Search',
      searchWithImage: 'Search with Image',
      findUsingPicture: 'Find products using a picture',
      uploadImage: 'Upload Image',
      dragDropImage: 'Drag & Drop Image Here',
      captureCamera: 'Capture with Camera',
      yourUploadedImage: 'Your Uploaded Image',
      aiIdentified: 'AI Identified Attributes',
      similarProducts: 'Visually Similar Products',
      visualMatch: 'Visual Match',
      detectedCategory: 'Detected Category',
      productType: 'Product Type',
      dominantColors: 'Dominant Colors',
      materialTexture: 'Material & Texture',
      styleDesign: 'Style & Design',
      potentialUseCase: 'Potential Use Case',
      addInstructions: 'Add optional text instructions (e.g. under ₹3,000, black, marathon)...',
      takeSnapshot: 'Take Snapshot',
      flipCamera: 'Flip Camera',
      changeImage: 'Change Image',
      removeImage: 'Remove Image',
      analyzingImage: 'Analyzing image & computing vector similarity...',
      cameraPermissionDenied: 'Camera permission denied or camera unavailable.'
    },

    kn: {
      appName: 'ಎಐ ಶಾಪಿಂಗ್ ಅಸಿಸ್ಟೆಂಟ್',
      tagline: 'ಶಾಪಿಂಗ್, ಎಐ ಮೂಲಕ ಮರುಚಿಂತನೆ.',
      home: 'ಮುಖಪುಟ',
      discover: 'ಅನ್ವೇಷಿಸಿ',
      assistant: 'ಎಐ ಅಸಿಸ್ಟೆಂಟ್',
      deals: 'ಆಫರ್‌ಗಳು',
      ordersProfile: 'ಆರ್ಡರ್‌ಗಳು ಮತ್ತು ಪ್ರೊಫೈಲ್',
      cart: 'ಕಾರ್ಟ್',
      compare: 'ಹೋಲಿಕೆ',
      wishlist: 'ವಿಶ್‌ಲಿಸ್ಟ್',
      adminDashboard: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      merchantDashboard: 'ವ್ಯಾಪಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      searchPlaceholder: 'ಉತ್ಪನ್ನಗಳು, ವರ್ಗಗಳು ಅಥವಾ ಬಜೆಟ್ ಹುಡುಕಿ (ಉದಾ. ₹60,000 ಒಳಗೆ ಲ್ಯಾಪ್ಟಾಪ್)...',
      aiCopilotPlaceholder: 'ನಿಮ್ಮ ಎಐ ಶಾಪಿಂಗ್ ಕೊಪೈಲಟ್‌ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ...',
      addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
      buyNow: 'ಈಗಲೇ ಖರೀದಿಸಿ',
      inStock: 'ದಾಸ್ತಾನು ಲಭ್ಯವಿದೆ',
      lowStock: 'ಕಡಿಮೆ ದಾಸ್ತಾನು',
      outOfStock: 'ಖಾಲಿಯಾಗಿದೆ',
      reviews: 'ವಿಮರ್ಶೆಗಳು',
      rating: 'ರೇಟಿಂಗ್',
      price: 'ಬೆಲೆ',
      originalPrice: 'ಮೂಲ ಬೆಲೆ',
      saveAmount: 'ಉಳಿತಾಯ',
      customerPortal: 'ಗ್ರಾಹಕ ಪೋರ್ಟಲ್',
      customerDesc: 'ಉತ್ಪನ್ನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಎಐ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಶಾಪಿಂಗ್ ನಿರ್ವಹಿಸಿ.',
      adminPortal: 'ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್',
      adminDesc: 'ಉತ್ಪನ್ನಗಳು, ಬಳಕೆದಾರರು, ದಾಸ್ತಾನು, ಆರ್ಡರ್‌ಗಳು ಮತ್ತು ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      customerLogin: 'ಗ್ರಾಹಕರ ಲಾಗಿನ್',
      createAccount: 'ಹೊಸ ಖಾತೆ ರಚಿಸಿ',
      adminLogin: 'ಅಡ್ಮಿನ್ ಲಾಗಿನ್',
      logout: 'ಲಾಗ್ ಔಟ್',
      logoutSuccess: 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಆಗಿದೆ.',
      welcomeUser: 'ಸುಸ್ವಾಗತ, {name}!',
      orderSummary: 'ಆರ್ಡರ್ ವಿವರ',
      subtotal: 'ಉಪಮೊತ್ತ',
      discount: 'ರಿಯಾಯಿತಿ',
      taxGst: 'ಜಿಎಸ್‌ಟಿ (18%)',
      shipping: 'ರವಾನೆ ಶುಲ್ಕ',
      freeShipping: 'ಉಚಿತ',
      totalPayable: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
      proceedToPayment: 'ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ',
      payWithRazorpay: 'ರೇಜರ್‌ಪೇ ಮೂಲಕ ಪಾವತಿಸಿ (ಯುಪಿಐ, ಕಾರ್ಡ್‌ಗಳು)',
      paymentSuccess: 'ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ.',
      paymentFailed: 'ಪಾವತಿ ವಿಫಲವಾಗಿದೆ ಅಥವಾ ರದ್ದುಗೊಂಡಿದೆ. ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
      orderHistory: 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು',
      statusPaid: 'ಪಾವತಿಸಲಾಗಿದೆ',
      statusPending: 'ಬಾಕಿ ಇದೆ',
      statusFailed: 'ವಿಫಲವಾಗಿದೆ',
      editProfile: 'ಪ್ರೊಫೈಲ್ ತಿದ್ದುಪಡಿ',
      changePassword: 'ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ',
      preferredLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
      saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      kpiTotalRevenue: 'ಒಟ್ಟು ಆದಾಯ',
      kpiTotalOrders: 'ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು',
      kpiAov: 'ಸರಾಸರಿ ಆರ್ಡರ್ ಮೌಲ್ಯ',
      kpiTotalCustomers: 'ಒಟ್ಟು ಗ್ರಾಹಕರು',
      kpiProductsSold: 'ಮಾರಾಟವಾದ ಉತ್ಪನ್ನಗಳು',
      kpiConversionRate: 'ಪರಿವರ್ತನೆ ದರ',
      priceIntelligence: 'ಬೆಲೆ ಗುಪ್ತಚರ',
      smartBundle: 'ಎಐ ಸ್ಮಾರ್ಟ್ ಬಂಡಲ್',
      aiScoreExplain: '5-ಅಂಶಗಳ ಸಮಗ್ರ ಅಂಕ ವಿಶ್ಲೇಷಣೆ',
      voiceSearch: 'ಧ್ವನಿ ಹುಡುಕಾಟ',
      imageSearch: 'ಚಿತ್ರ ಹುಡುಕಾಟ',
      searchWithImage: 'ಚಿತ್ರದೊಂದಿಗೆ ಹುಡುಕಿ',
      findUsingPicture: 'ಚಿತ್ರವನ್ನು ಬಳಸಿಕೊಂಡು ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ',
      uploadImage: 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      dragDropImage: 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ',
      captureCamera: 'ಕ್ಯಾಮೆರಾದೊಂದಿಗೆ ಸೆರೆಹಿಡಿಯಿರಿ',
      yourUploadedImage: 'ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರ',
      aiIdentified: 'ಎಐ ಗುರುತಿಸಿದ ಗುಣಲಕ್ಷಣಗಳು',
      similarProducts: 'ದೃಷ್ಟಿಗೋಚರವಾಗಿ ಹೋಲುವ ಉತ್ಪನ್ನಗಳು',
      visualMatch: 'ದೃಶ್ಯ ಹೊಂದಾಣಿಕೆ',
      detectedCategory: 'ಗುರುತಿಸಿದ ವರ್ಗ',
      productType: 'ಉತ್ಪನ್ನದ ಪ್ರಕಾರ',
      dominantColors: 'ಪ್ರಮುಖ ಬಣ್ಣಗಳು',
      materialTexture: 'ವಸ್ತು ಮತ್ತು ವಿನ್ಯಾಸ',
      styleDesign: 'ಶೈಲಿ ಮತ್ತು ವಿನ್ಯಾಸ',
      potentialUseCase: 'ಸಂಭಾವ್ಯ ಬಳಕೆಯ ಉದ್ದೇಶ',
      addInstructions: 'ಹೆಚ್ಚುವರಿ ಸೂಚನೆಗಳನ್ನು ಸೇರಿಸಿ (ಉದಾ. ₹3,000 ಒಳಗೆ, ಕಪ್ಪು ಬಣ್ಣ)...',
      takeSnapshot: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      flipCamera: 'ಕ್ಯಾಮೆರಾ ತಿರುಗಿಸಿ',
      changeImage: 'ಚಿತ್ರ ಬದಲಾಯಿಸಿ',
      removeImage: 'ಚಿತ್ರ ತೆಗೆದುಹಾಕಿ',
      analyzingImage: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ ಮತ್ತು ವೆಕ್ಟರ್ ಹೋಲಿಕೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...',
      cameraPermissionDenied: 'ಕ್ಯಾಮೆರಾ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ ಅಥವಾ ಕ್ಯಾಮೆರಾ ಲಭ್ಯವಿಲ್ಲ.'
    },

    hi: {
      appName: 'एआई शॉपिंग असिस्टेंट',
      tagline: 'शॉपिंग, एआई द्वारा पुनर्परिभाषित।',
      home: 'होम',
      discover: 'खोजें',
      assistant: 'एआई असिस्टेंट',
      deals: 'डील्स',
      ordersProfile: 'ऑर्डर और प्रोफाइल',
      cart: 'कार्ट',
      compare: 'तुलना',
      wishlist: 'विशलिस्ट',
      adminDashboard: 'एडमिन डैशबोर्ड',
      merchantDashboard: 'मर्चेंट डैशबोर्ड',
      searchPlaceholder: 'उत्पाद, श्रेणियां या बजट खोजें (उदा. ₹60,000 के अंदर लैपटॉप)...',
      aiCopilotPlaceholder: 'अपने एआई शॉपिंग कोपायलट से कुछ भी पूछें...',
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      inStock: 'स्टॉक में उपलब्ध',
      lowStock: 'कम स्टॉक',
      outOfStock: 'स्टॉक समाप्त',
      reviews: 'समीक्षाएं',
      rating: 'रेटिंग',
      price: 'कीमत',
      originalPrice: 'मूल कीमत',
      saveAmount: 'बचत',
      customerPortal: 'ग्राहक पोर्टल',
      customerDesc: 'उत्पादों की खोज करें, एआई सिफारिशें प्राप्त करें और अपनी खरीदारी प्रबंधित करें।',
      adminPortal: 'प्रशासक पोर्टल',
      adminDesc: 'उत्पादों, उपयोगकर्ताओं, इन्वेंट्री, ऑर्डर और व्यावसायिक विश्लेषण का प्रबंधन करें।',
      customerLogin: 'ग्राहक लॉगिन',
      createAccount: 'नया खाता बनाएं',
      adminLogin: 'एडमिन लॉगिन',
      logout: 'लॉग आउट',
      logoutSuccess: 'सफलतापूर्वक लॉग आउट हो गया।',
      welcomeUser: 'स्वागत है, {name}!',
      orderSummary: 'ऑर्डर सारांश',
      subtotal: 'उप-योग',
      discount: 'छूट',
      taxGst: 'जीएसटी (18%)',
      shipping: 'शिपिंग शुल्क',
      freeShipping: 'मुफ्त',
      totalPayable: 'कुल देय राशि',
      proceedToPayment: 'भुगतान के लिए आगे बढ़ें',
      payWithRazorpay: 'रेज़रपे द्वारा भुगतान करें (यूपीआई, कार्ड, नेटबैंकिंग)',
      paymentSuccess: 'भुगतान सफल! आपका ऑर्डर कन्फर्म हो गया है।',
      paymentFailed: 'भुगतान विफल या रद्द हुआ। आप पुनः प्रयास कर सकते हैं।',
      orderHistory: 'मेरे ऑर्डर',
      statusPaid: 'भुगतान किया गया',
      statusPending: 'लंबित',
      statusFailed: 'विफल',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      changePassword: 'पासवर्ड बदलें',
      preferredLanguage: 'पसंदीदा भाषा',
      saveChanges: 'परिवर्तन सहेजें',
      kpiTotalRevenue: 'कुल राजस्व',
      kpiTotalOrders: 'कुल ऑर्डर',
      kpiAov: 'औसत ऑर्डर मूल्य',
      kpiTotalCustomers: 'कुल ग्राहक',
      kpiProductsSold: 'बेचे गए उत्पाद',
      kpiConversionRate: 'रूपांतरण दर',
      priceIntelligence: 'मूल्य विश्लेषण',
      smartBundle: 'एआई स्मार्ट बंडल',
      aiScoreExplain: '5-कारक भारित स्कोर विवरण',
      voiceSearch: 'आवाज़ से खोजें',
      imageSearch: 'चित्र से खोजें',
      searchWithImage: 'तस्वीर से खोजें',
      findUsingPicture: 'तस्वीर का उपयोग करके उत्पाद खोजें',
      uploadImage: 'छवि अपलोड करें',
      dragDropImage: 'छवि यहाँ खींचें और छोड़ें',
      captureCamera: 'कैमरे से फ़ोटो लें',
      yourUploadedImage: 'आपकी अपलोड की गई छवि',
      aiIdentified: 'एआई द्वारा पहचाने गए गुण',
      similarProducts: 'समान दिखने वाले उत्पाद',
      visualMatch: 'दृश्य समानता',
      detectedCategory: 'पहचानी गई श्रेणी',
      productType: 'उत्पाद प्रकार',
      dominantColors: 'प्रमुख रंग',
      materialTexture: 'सामग्री एवं बनावट',
      styleDesign: 'शैली और डिज़ाइन',
      potentialUseCase: 'उपयोग का संभावित उद्देश्य',
      addInstructions: 'अतिरिक्त निर्देश जोड़ें (उदा. ₹3,000 के अंदर, काला रंग)...',
      takeSnapshot: 'फ़ोटो खींचें',
      flipCamera: 'कैमरा बदलें',
      changeImage: 'छवि बदलें',
      removeImage: 'छवि हटाएं',
      analyzingImage: 'छवि का विश्लेषण और वेक्टर समानता की गणना की जा रही है...',
      cameraPermissionDenied: 'कैमरा अनुमति अस्वीकृत या कैमरा अनुपलब्ध है।'
    },

    ta: {
      appName: 'ஏஐ ஷாப்பிங் உதவியாளர்',
      tagline: 'ஷாப்பிங், ஏஐ மூலம் மறுவடிவமைப்பு.',
      home: 'முகப்பு',
      discover: 'கண்டறியவும்',
      assistant: 'ஏஐ உதவியாளர்',
      deals: 'சலுகைகள்',
      ordersProfile: 'ஆர்டர்கள் & சுயவிவரம்',
      cart: 'கூடை',
      compare: 'ஒப்பீடு',
      wishlist: 'விருப்பப்பட்டியல்',
      adminDashboard: 'நிர்வாக டாஷ்போர்டு',
      merchantDashboard: 'வணிகர் டாஷ்போர்டு',
      searchPlaceholder: 'பொருட்கள் அல்லது பட்ஜெட்டைத் தேடுங்கள் (எ.கா. ₹60,000க்குள் மடிக்கணினி)...',
      aiCopilotPlaceholder: 'உங்கள் ஏஐ ஷாப்பிங் உதவியாளரிடம் எதையும் கேளுங்கள்...',
      addToCart: 'கூடையில் சேர்',
      buyNow: 'உடனே வாங்கவும்',
      inStock: 'கையிருப்பில் உள்ளது',
      lowStock: 'குறைந்த இருப்பு',
      outOfStock: 'இருப்பு இல்லை',
      reviews: 'மதிப்புரைகள்',
      rating: 'மதிப்பீடு',
      price: 'விலை',
      originalPrice: 'அசல் விலை',
      saveAmount: 'சேமிப்பு',
      customerPortal: 'வாடிக்கையாளர் போர்டல்',
      customerDesc: 'பொருட்களைக் கண்டறியவும், ஏஐ பரிந்துரைகளைப் பெறவும் மற்றும் ஷாப்பிங்கை நிர்வகிக்கவும்.',
      adminPortal: 'நிர்வாகி போர்டல்',
      adminDesc: 'பொருட்கள், பயனர்கள், சரக்கு, ஆர்டர்கள் மற்றும் வணிக பகுப்பாய்வுகளை நிர்வகிக்கவும்.',
      customerLogin: 'வாடிக்கையாளர் உள்நுழைவு',
      createAccount: 'புதிய கணக்கை உருவாக்கவும்',
      adminLogin: 'நிர்வாக உள்நுழைவு',
      logout: 'வெளியேறு',
      logoutSuccess: 'வெற்றிகரமாக வெளியேற்றப்பட்டது.',
      welcomeUser: 'வணக்கம், {name}!',
      orderSummary: 'ஆர்டர் சுருக்கம்',
      subtotal: 'துணைத்தொகை',
      discount: 'தள்ளுபடி',
      taxGst: 'ஜிஎஸ்டி (18%)',
      shipping: 'டெலிவரி கட்டணம்',
      freeShipping: 'இலவசம்',
      totalPayable: 'செலுத்த வேண்டிய மொத்தத் தொகை',
      proceedToPayment: 'பணம் செலுத்த தொடரவும்',
      payWithRazorpay: 'ரேசர்பே மூலம் பணம் செலுத்துங்கள் (யூபிஐ, கார்டு)',
      paymentSuccess: 'பணம் செலுத்துதல் வெற்றிகரமாக முடிந்தது! ஆர்டர் உறுதிசெய்யப்பட்டது.',
      paymentFailed: 'பணம் செலுத்துதல் தோல்வியுற்றது. மீண்டும் முயற்சிக்கவும்.',
      orderHistory: 'எனது ஆர்டர்கள்',
      statusPaid: 'செலுத்தப்பட்டது',
      statusPending: 'நிலுவையில் உள்ளது',
      statusFailed: 'தோல்வியுற்றது',
      editProfile: 'சுயவிவரத்தைத் திருத்து',
      changePassword: 'கடவுச்சொல்லை மாற்றவும்',
      preferredLanguage: 'விருப்பமான மொழி',
      saveChanges: 'மாற்றங்களைச் சேமிக்கவும்',
      kpiTotalRevenue: 'மொத்த வருவாய்',
      kpiTotalOrders: 'மொத்த ஆர்டர்கள்',
      kpiAov: 'சராசரி ஆர்டர் மதிப்பு',
      kpiTotalCustomers: 'மொத்த வாடிக்கையாளர்கள்',
      kpiProductsSold: 'விற்கப்பட்ட பொருட்கள்',
      kpiConversionRate: 'மாற்ற விகிதம்',
      priceIntelligence: 'விலை நுண்ணறிவு',
      smartBundle: 'ஏஐ ஸ்மார்ட் பண்டில்',
      aiScoreExplain: '5-காரணி எடைத்திறன் பகுப்பாய்வு',
      voiceSearch: 'குரல் தேடல்',
      imageSearch: 'படத் தேடல்',
      searchWithImage: 'படத்தைக் கொண்டு தேடுங்கள்',
      findUsingPicture: 'படத்தைப் பயன்படுத்தி பொருட்களைக் கண்டறியவும்',
      uploadImage: 'படத்தைப் பதிவேற்றவும்',
      dragDropImage: 'படத்தை இங்கே இழுத்து விடவும்',
      captureCamera: 'கேமரா மூலம் படம் எடுக்கவும்',
      yourUploadedImage: 'நீங்கள் பதிவேற்றிய படம்',
      aiIdentified: 'AI கண்டறிந்த அம்சங்கள்',
      similarProducts: 'ஒரே மாதிரியான தயாரிப்புகள்',
      visualMatch: 'காட்சிப் பொருத்தம்',
      detectedCategory: 'கண்டறியப்பட்ட பிரிவு',
      productType: 'தயாரிப்பு வகை',
      dominantColors: 'முக்கிய நிறங்கள்',
      materialTexture: 'பொருள் & அமைப்பு',
      styleDesign: 'பாணி & வடிவமைப்பு',
      potentialUseCase: 'பயன்பாட்டு நோக்கம்',
      addInstructions: 'கூடுதல் குறிப்புகளைச் சேர்க்கவும் (எ.கா. ₹3,000க்குள், கருப்பு நிறம்)...',
      takeSnapshot: 'படம் எடுக்கவும்',
      flipCamera: 'கேமராவை மாற்றவும்',
      changeImage: 'படத்தை மாற்றவும்',
      removeImage: 'படத்தை நீக்கவும்',
      analyzingImage: 'படம் பகுப்பாய்வு செய்யப்பட்டு காட்சிப் பொருத்தம் கணக்கிடப்படுகிறது...',
      cameraPermissionDenied: 'கேமரா அனுமதி மறுக்கப்பட்டது அல்லது கேமரா கிடைக்கவில்லை.'
    },

    te: {
      appName: 'ఏఐ షాపింగ్ అసిస్టెంట్',
      tagline: 'షాపింగ్, ఏఐ ద్వారా పునర్నిర్వచించబడింది.',
      home: 'హోమ్',
      discover: 'అన్వేషించండి',
      assistant: 'ఏఐ అసిస్టెంట్',
      deals: 'డీల్స్',
      ordersProfile: 'ఆర్డర్లు & ప్రొఫైల్',
      cart: 'కార్ట్',
      compare: 'పోలిక',
      wishlist: 'విష్‌లిస్ట్',
      adminDashboard: 'అడ్మిన్ డ్యాష్‌బోర్డ్',
      merchantDashboard: 'వ్యాపారి డ్యాష్‌బోర్డ్',
      searchPlaceholder: 'ఉత్పత్తులు లేదా బడ్జెట్‌ను శోధించండి (ఉదా. ₹60,000 లోపు ల్యాప్‌టాప్)...',
      aiCopilotPlaceholder: 'మీ ఏఐ షాపింగ్ కోపైలట్‌ను ఏదైనా అడగండి...',
      addToCart: 'కార్ట్‌కు జోడించు',
      buyNow: 'ఇప్పుడే కొనండి',
      inStock: 'స్టాక్ అందుబాటులో ఉంది',
      lowStock: 'తక్కువ స్టాక్',
      outOfStock: 'స్టాక్ అయిపోయింది',
      reviews: 'సమీక్షలు',
      rating: 'రేటింగ్',
      price: 'ధర',
      originalPrice: 'అసలు ధర',
      saveAmount: 'పొదుపు',
      customerPortal: 'కస్టమర్ పోర్టల్',
      customerDesc: 'ఉత్పత్తులను అన్వేషించండి, ఏఐ సిఫార్సులను పొందండి మరియు మీ షాపింగ్‌ను నిర్వహించండి.',
      adminPortal: 'అడ్మినిస్ట్రేటర్ పోర్టల్',
      adminDesc: 'ఉత్పత్తులు, వినియోగదారులు, ఇన్వెంటరీ, ఆర్డర్లు మరియు వ్యాపార విశ్లేషణలను నిర్వహించండి.',
      customerLogin: 'కస్టమర్ లాగిన్',
      createAccount: 'ఖాతాను సృష్టించండి',
      adminLogin: 'అడ్మిన్ లాగిన్',
      logout: 'లాగ్ అవుట్',
      logoutSuccess: 'విజయవంతంగా లాగ్ అవుట్ అయ్యారు.',
      welcomeUser: 'స్వాగతం, {name}!',
      orderSummary: 'ఆర్డర్ సారాంశం',
      subtotal: 'ఉపమొత్తం',
      discount: 'డిస్కౌంట్',
      taxGst: 'జీఎస్టీ (18%)',
      shipping: 'రవాణా ఛార్జీలు',
      freeShipping: 'ఉచితం',
      totalPayable: 'చెల్లించాల్సిన మొత్తం',
      proceedToPayment: 'చెల్లింపుకు కొనసాగండి',
      payWithRazorpay: 'రేజర్‌పే ద్వారా చెల్లించండి (యూపీఐ, కార్డులు)',
      paymentSuccess: 'చెల్లింపు విజయవంతమైంది! ఆర్డర్ నిర్ధారించబడింది.',
      paymentFailed: 'చెల్లింపు విఫలమైంది లేదా రద్దు చేయబడింది. మళ్ళీ ప్రయత్నించండి.',
      orderHistory: 'నా ఆర్డర్లు',
      statusPaid: 'చెల్లించబడింది',
      statusPending: 'పెండింగ్‌లో ఉంది',
      statusFailed: 'విఫలమైంది',
      editProfile: 'ప్రొఫైల్ సవరించండి',
      changePassword: 'పాస్‌వర్డ్ మార్చండి',
      preferredLanguage: 'ప్రాధాన్య భాష',
      saveChanges: 'మార్పులను సేవ్ చేయండి',
      kpiTotalRevenue: 'మొత్తం ఆదాయం',
      kpiTotalOrders: 'మొత్తం ఆర్డర్లు',
      kpiAov: 'సగటు ఆర్డర్ విలువ',
      kpiTotalCustomers: 'మొత్తం కస్టమర్లు',
      kpiProductsSold: 'విక్రయించబడిన ఉత్పత్తులు',
      kpiConversionRate: 'కన్వర్షన్ రేటు',
      priceIntelligence: 'ధర విశ్లేషణ',
      smartBundle: 'ఏఐ స్మార్ట్ బండిల్',
      aiScoreExplain: '5-కారకాల సమగ్ర స్కోర్ విశ్లేషణ',
      voiceSearch: 'వాయిస్ శోధన',
      imageSearch: 'చిత్ర శోధన',
      searchWithImage: 'చిత్రంతో శోధించండి',
      findUsingPicture: 'చిత్రాన్ని ఉపయోగించి ఉత్పత్తులను కనుగొనండి',
      uploadImage: 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
      dragDropImage: 'చిత్రాన్ని ఇక్కడకు లాగి వదలండి',
      captureCamera: 'కెమెరాతో చిత్రాన్ని తీయండి',
      yourUploadedImage: 'మీరు అప్‌లోడ్ చేసిన చిత్రం',
      aiIdentified: 'AI గుర్తించిన లక్షణాలు',
      similarProducts: 'దృశ్యపరంగా సారూప్య ఉత్పత్తులు',
      visualMatch: 'విజువల్ మ్యాచ్',
      detectedCategory: 'గుర్తించబడిన వర్గం',
      productType: 'ఉత్పత్తి రకం',
      dominantColors: 'ప్రధాన రంగులు',
      materialTexture: 'పదార్థం & ఆకృతి',
      styleDesign: 'శైలి & డిజైన్',
      potentialUseCase: 'ఉపయోగ సందర్భం',
      addInstructions: 'అదనపు సూచనలు జోడించండి (ఉదా. ₹3,000 లోపు, నలుపు)...',
      takeSnapshot: 'ఫోటో తీయండి',
      flipCamera: 'కెమెరా మార్చండి',
      changeImage: 'చిత్రం మార్చండి',
      removeImage: 'చిత్రం తొలగించండి',
      analyzingImage: 'చిత్రాన్ని విశ్లేషిస్తూ వెక్టర్ సారూప్యతను లెక్కిస్తోంది...',
      cameraPermissionDenied: 'కెమెరా అనుమతి నిరాకరించబడింది లేదా కెమెరా అందుబాటులో లేదు.'
    },

    ml: {
      appName: 'എഐ ഷോപ്പിംഗ് അസിസ്റ്റന്റ്',
      tagline: 'ഷോപ്പിംഗ്, എഐ വഴി പുനർനിർവചിക്കപ്പെട്ടു.',
      home: 'ഹോം',
      discover: 'കണ്ടെത്തുക',
      assistant: 'എഐ അസിസ്റ്റന്റ്',
      deals: 'ഓഫറുകൾ',
      ordersProfile: 'ഓർഡറുകളും പ്രൊഫൈലും',
      cart: 'കാർട്ട്',
      compare: 'താരതമ്യം',
      wishlist: 'വിഷ്‌ലിസ്റ്റ്',
      adminDashboard: 'അഡ്മിൻ ഡാഷ്‌ബോർഡ്',
      merchantDashboard: 'മർച്ചന്റ് ഡാഷ്‌ബോർഡ്',
      searchPlaceholder: 'ഉൽപ്പന്നങ്ങൾ അല്ലെങ്കിൽ ബജറ്റ് തിരയുക (ഉദാ. ₹60,000-ൽ താഴെയുള്ള ലാപ്ടോപ്പ്)...',
      aiCopilotPlaceholder: 'നിങ്ങളുടെ എഐ ഷോപ്പിംഗ് അസിസ്റ്റന്റിനോട് ചോദിക്കൂ...',
      addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
      buyNow: 'ഉടൻ വാങ്ങുക',
      inStock: 'സ്റ്റോക്ക് ലഭ്യമാണ്',
      lowStock: 'കുറഞ്ഞ സ്റ്റോക്ക്',
      outOfStock: 'സ്റ്റോക്ക് തീർന്നു',
      reviews: 'അവലോകനങ്ങൾ',
      rating: 'റേറ്റിംഗ്',
      price: 'വില',
      originalPrice: 'യഥാർത്ഥ വില',
      saveAmount: 'ലാഭം',
      customerPortal: 'ഉപഭോക്തൃ പോർട്ടൽ',
      customerDesc: 'ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുക, എഐ ശുപാർശകൾ നേടുക, ഷോപ്പിംഗ് നിയന്ത്രിക്കുക.',
      adminPortal: 'അഡ്മിനിസ്ട്രേറ്റർ പോർട്ടൽ',
      adminDesc: 'ഉൽപ്പന്നങ്ങൾ, ഉപയോക്താക്കൾ, ഇൻവെന്ററി, ഓർഡറുകൾ, ബിസിനസ്സ് വിശകലനം എന്നിവ കൈകാര്യം ചെയ്യുക.',
      customerLogin: 'കസ്റ്റമർ ലോഗിൻ',
      createAccount: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      adminLogin: 'അഡ്മിൻ ലോഗിൻ',
      logout: 'ലോഗ് ഔട്ട്',
      logoutSuccess: 'വിജയകരമായി ലോഗ് ഔട്ട് ചെയ്തു.',
      welcomeUser: 'സ്വാഗതം, {name}!',
      orderSummary: 'ഓർഡർ സംഗ്രഹം',
      subtotal: 'ഉപതുക',
      discount: 'കിഴിവ്',
      taxGst: 'ജിഎസ്ടി (18%)',
      shipping: 'ഷിപ്പിംഗ് നിരക്കുകൾ',
      freeShipping: 'സൗജന്യം',
      totalPayable: 'ആകെ നൽകേണ്ട തുക',
      proceedToPayment: 'പേയ്‌മെന്റിലേക്ക് പോകുക',
      payWithRazorpay: 'റേസർപേ വഴി പണമടയ്ക്കുക (യുപിഐ, കാർഡുകൾ)',
      paymentSuccess: 'പേയ്‌മെന്റ് വിജയകരം! ഓർഡർ സ്ഥിരീകരിച്ചു.',
      paymentFailed: 'പേയ്‌മെന്റ് പരാജയപ്പെട്ടു അല്ലെങ്കിൽ റദ്ദാക്കി. വീണ്ടും ശ്രമിക്കുക.',
      orderHistory: 'എന്റെ ഓർഡറുകൾ',
      statusPaid: 'പണമടച്ചു',
      statusPending: 'തീർപ്പുകൽപ്പിച്ചിട്ടില്ല',
      statusFailed: 'പരാജയപ്പെട്ടു',
      editProfile: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
      changePassword: 'പാസ്‌വേഡ് മാറ്റുക',
      preferredLanguage: 'തിരഞ്ഞെടുത്ത ഭാഷ',
      saveChanges: 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക',
      kpiTotalRevenue: 'ആകെ വരുമാനം',
      kpiTotalOrders: 'ആകെ ഓർഡറുകൾ',
      kpiAov: 'ശരാശരി ഓർഡർ മൂല്യം',
      kpiTotalCustomers: 'ആകെ ഉപഭോക്താക്കൾ',
      kpiProductsSold: 'വിറ്റ ഉൽപ്പന്നങ്ങൾ',
      kpiConversionRate: 'കൺവേർഷൻ നിരക്ക്',
      priceIntelligence: 'വില ഇന്റലിജൻസ്',
      smartBundle: 'എഐ സ്മാർട്ട് ബണ്ടിൽ',
      aiScoreExplain: '5-ഘടക വെയിറ്റഡ് സ്കോർ വിശകലനം',
      voiceSearch: 'വോയ്‌സ് തിരയൽ',
      imageSearch: 'ചിത്ര തിരയൽ',
      searchWithImage: 'ചിത്രം ഉപയോഗിച്ച് തിരയുക',
      findUsingPicture: 'ഒരു ചിത്രം ഉപയോഗിച്ച് ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുക',
      uploadImage: 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
      dragDropImage: 'ചിത്രം ഇവിടെ ഡ്രാഗ് ചെയ്ത് ഇടുക',
      captureCamera: 'ക്യാമറ ഉപയോഗിച്ച് പകർത്തുക',
      yourUploadedImage: 'നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത ചിത്രം',
      aiIdentified: 'AI തിരിച്ചറിഞ്ഞ സവിശേഷതകൾ',
      similarProducts: 'കാഴ്ചയിൽ സമാനമായ ഉൽപ്പന്നങ്ങൾ',
      visualMatch: 'വിഷ്വൽ മാച്ച്',
      detectedCategory: 'തിരിച്ചറിഞ്ഞ വിഭാഗം',
      productType: 'ഉൽപ്പന്ന തരം',
      dominantColors: 'പ്രധാന നിറങ്ങൾ',
      materialTexture: 'മെറ്റീരിയൽ & ടെക്സ്ചർ',
      styleDesign: 'ശൈലി & ഡിസൈൻ',
      potentialUseCase: 'ഉപയോഗ ഉദ്ദേശ്യം',
      addInstructions: 'കൂടുതൽ നിർദ്ദേശങ്ങൾ നൽകുക (ഉദാ. ₹3,000-ൽ താഴെ, കറുപ്പ് നിറം)...',
      takeSnapshot: 'ഫോട്ടോ എടുക്കുക',
      flipCamera: 'ക്യാമറ മാറ്റുക',
      changeImage: 'ചിത്രം മാറ്റുക',
      removeImage: 'ചിത്രം ഒഴിവാക്കുക',
      analyzingImage: 'ചിത്രം വിശകലനം ചെയ്യുകയും വെക്റ്റർ സമാനത കണക്കാക്കുകയും ചെയ്യുന്നു...',
      cameraPermissionDenied: 'ക്യാമറ അനുമതി നിരസിച്ചു അല്ലെങ്കിൽ ക്യാമറ ലഭ്യമല്ല.'
    }
  },

  // Translation function with variable interpolation and fallback
  t(key, params = {}) {
    const lang = this.currentLang;
    const dict = this.translations[lang] || this.translations.en;
    let text = dict[key] || this.translations.en[key] || key;

    for (const p in params) {
      text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    }
    return text;
  },

  // Set Language dynamically
  setLanguage(langCode) {
    if (!this.translations[langCode]) langCode = 'en';
    this.currentLang = langCode;
    try {
      localStorage.setItem('shopai_language', langCode);
    } catch (e) {}

    if (window.Store && Store.user) {
      Store.user.preferred_language = langCode;
      Store.saveStorage();
    }

    // Update Language selectors on screen
    document.querySelectorAll('.lang-selector-select').forEach(sel => {
      sel.value = langCode;
    });

    // Re-render navbar and active view
    if (window.App) {
      App.renderNavbarLinks();
      App.renderCurrentView();
      Store.showToast(`Language updated to ${this.getLanguageName(langCode)}`, 'info');
    }
  },

  getLanguageName(code) {
    const found = this.languages.find(l => l.code === code);
    return found ? `${found.native} (${found.name})` : 'English';
  },

  // Render Language Selector Dropdown Widget
  renderLanguageSelector(extraStyle = '') {
    return `
      <div class="lang-selector-wrap" style="display:inline-flex; align-items:center; gap:6px; ${extraStyle}">
        <span style="font-size:0.9rem;">🌐</span>
        <select class="lang-selector-select glass-pill" onchange="I18n.setLanguage(this.value)" style="border-radius:var(--radius-pill); padding:5px 10px; font-size:0.8rem; font-weight:600; background:var(--color-surface-elevated); color:var(--color-text); border:1px solid var(--color-border); cursor:pointer; outline:none;">
          ${this.languages.map(l => `
            <option value="${l.code}" ${l.code === this.currentLang ? 'selected' : ''}>
              ${l.native} (${l.name})
            </option>
          `).join('')}
        </select>
      </div>
    `;
  },

  // Multilingual Natural Language Intent Parser for AI Copilot
  parseMultilingualShoppingQuery(text) {
    const raw = (text || '').trim();
    const lower = raw.toLowerCase();

    // 1. Detect language
    let detectedLang = 'en';
    if (/[\u0C80-\u0CFF]/.test(raw)) detectedLang = 'kn'; // Kannada
    else if (/[\u0900-\u097F]/.test(raw)) detectedLang = 'hi'; // Hindi
    else if (/[\u0B80-\u0BFF]/.test(raw)) detectedLang = 'ta'; // Tamil
    else if (/[\u0C00-\u0C7F]/.test(raw)) detectedLang = 'te'; // Telugu
    else if (/[\u0D00-\u0D7F]/.test(raw)) detectedLang = 'ml'; // Malayalam

    // 2. Extract Budget (Handles ₹60,000, 60k, 60000, 8,000, etc.)
    let maxPrice = null;
    const priceMatch = raw.match(/(?:₹|rs\.?|inr)?\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)\s*(?:k|thousand)?/i);
    if (priceMatch) {
      let numStr = priceMatch[1].replace(/,/g, '');
      let val = parseInt(numStr, 10);
      if (raw.toLowerCase().includes(numStr + 'k')) val *= 1000;
      if (val > 100) maxPrice = val;
    }

    // 3. Category keywords mapping across all 6 languages
    let category = null;
    const catRules = [
      {
        cat: 'Laptops & Computers',
        keys: ['laptop', 'computer', 'notebook', 'ultrabook', 'pc', 'ಲ್ಯಾಪ್ಟಾಪ್', 'ಕಂಪ್ಯೂಟರ್', 'लैपटॉप', 'कंप्यूटर', 'மடிக்கணினி', 'கணினி', 'ల్యాప్‌టాప్', 'కంప్యూటర్', 'ലാപ്‌ടോപ്പ്', 'കമ്പ്യൂട്ടർ']
      },
      {
        cat: 'Electronics',
        keys: ['headphone', 'audio', 'earphone', 'anc', 'speaker', 'sound', 'ಹೆಡ್‌ಫೋನ್', 'ಆಡಿಯೋ', 'हेडफोन', 'ऑडियो', 'இயர்போன்', 'ஹெட்ஃபோன்', 'హెడ్‌ఫోన్', 'ఆడియో', 'ഹെഡ്‌ഫോൺ', 'ഓഡിയോ']
      },
      {
        cat: 'Footwear',
        keys: ['shoe', 'sneaker', 'running', 'footwear', 'marathon', 'ಶೂ', 'ಸ್ನೀಕರ್', 'ಓಟ', 'जूता', 'जूते', 'स्नीकर', 'காலணி', 'ஷூ', 'షూ', 'స్నీకర్', 'ഷൂ', 'പാദരക്ഷകൾ']
      },
      {
        cat: 'Outdoor Gear',
        keys: ['jacket', 'trekking', 'hiking', 'outdoor', 'waterproof', 'ಜಾಕೆಟ್', 'ಟ್ರೆಕ್ಕಿಂಗ್', 'जैकेट', 'ट्रेकिंग', 'ஜாக்கெட்', 'ട്രെക്കിംഗ്']
      },
      {
        cat: 'Bags & Accessories',
        keys: ['bag', 'backpack', 'sleeve', 'ಬ್ಯಾಗ್', 'ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್', 'बैग', 'बैकपैक', 'பை', 'బ్యాగ్', 'ബാഗ്']
      },
      {
        cat: 'Wearables',
        keys: ['watch', 'smartwatch', 'band', 'fitness', 'ವಾಚ್', 'ಸ್ಮಾರ್ಟ್‌ವಾಚ್', 'घड़ी', 'स्मार्टवॉच', 'கடிகாரம்', 'వాచ్', 'വാച്ച്']
      },
      {
        cat: 'Smart Living',
        keys: ['desk', 'monitor', 'lamp', 'living', 'chair', 'ಡೆಸ್ಕ್', 'മേശ', 'డెస్క్', 'डेस्क', 'மேஜை']
      }
    ];

    for (const rule of catRules) {
      for (const k of rule.keys) {
        if (lower.includes(k.toLowerCase())) {
          category = rule.cat;
          break;
        }
      }
      if (category) break;
    }

    // 4. Intent detection (follow-up intent)
    let followUpType = null;
    if (lower.includes('cheaper') || lower.includes('ಕಡಿಮೆ') || lower.includes('कम') || lower.includes('குறைந்த') || lower.includes('తక్కువ') || lower.includes('വില കുറഞ്ഞ')) {
      followUpType = 'cheaper';
    } else if (lower.includes('compare') || lower.includes('ಹೋಲಿಕೆ') || lower.includes('तुलना') || lower.includes('ஒப்பீடு') || lower.includes('పోలిక') || lower.includes('താരതമ്യം')) {
      followUpType = 'compare';
    } else if (lower.includes('battery') || lower.includes('ബാറ്ററി') || lower.includes('బ్యాటరీ') || lower.includes('बैटरी')) {
      followUpType = 'battery';
    } else if (lower.includes('cart') || lower.includes('buy') || lower.includes('ಖರೀದಿ') || lower.includes('खरीदें') || lower.includes('வாங்க') || lower.includes('కొనండి') || lower.includes('വാങ്ങുക')) {
      followUpType = 'cart';
    }

    return {
      detectedLang,
      category,
      maxPrice,
      followUpType,
      rawQuery: raw
    };
  }
};

window.I18n = I18n;
