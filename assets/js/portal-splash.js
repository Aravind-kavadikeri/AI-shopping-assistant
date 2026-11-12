/**
 * =========================================================================
 * AI SHOPPING ASSISTANT — SMART SHOPPING PORTAL 3D SPLASH SCREEN
 * Visual Style: Premium Realistic 3D • Deep Teal (#123D46) + Coral (#F07861)
 * Timeline: ~3.5s sequence (Portal Activation -> Product Emergence -> Brand Reveal -> Transition)
 * High-performance procedural Three.js architecture with full accessibility & WebGL fallback.
 * =========================================================================
 */

const PortalSplash = {
  isInitialized: false,
  isFinished: false,
  animFrameId: null,
  scene: null,
  camera: null,
  renderer: null,
  clock: null,
  portalGroup: null,
  innerRingGroup: null,
  coralPulse: null,
  productsGroup: null,
  productMeshes: {},
  disposed: false,

  // Check WebGL availability
  isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  },

  // Check reduced motion preference
  prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  init() {
    const splashEl = document.getElementById('splash-screen');
    if (!splashEl) return;

    // Run only once per session
    if (sessionStorage.getItem('shopai_splash_done') === 'true') {
      splashEl.classList.add('fade-out');
      splashEl.style.display = 'none';
      return;
    }

    // Skip handler registration
    const dismiss = () => this.dismiss();
    splashEl.addEventListener('click', dismiss);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        dismiss();
      }
    }, { once: true });

    // Accessibility fallback for reduced motion or missing WebGL
    if (this.prefersReducedMotion() || !this.isWebGLAvailable() || typeof THREE === 'undefined') {
      this.initFallback(splashEl);
      return;
    }

    try {
      this.initThreeScene(splashEl);
    } catch (err) {
      console.warn('WebGL init fallback triggered:', err);
      this.initFallback(splashEl);
    }
  },

  // WebGL 3D Smart Shopping Portal Scene
  initThreeScene(splashEl) {
    this.clock = new THREE.Clock();
    const container = document.getElementById('splash-canvas-container');
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Depth Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0E262B);
    this.scene.fog = new THREE.FogExp2(0x0E262B, 0.038);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 11.2);

    // 3. Renderer with ACES Tone Mapping
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    container.appendChild(this.renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0x123D46, 0.85);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xF7F4EC, 1.25);
    keyLight.position.set(5, 7, 7);
    this.scene.add(keyLight);

    const tealRimLight = new THREE.DirectionalLight(0x168C91, 1.6);
    tealRimLight.position.set(-6, -3, -4);
    this.scene.add(tealRimLight);

    const coreCoralLight = new THREE.PointLight(0xF07861, 2.2, 20, 2);
    coreCoralLight.position.set(0, 0, 0.4);
    this.scene.add(coreCoralLight);
    this.coreCoralLight = coreCoralLight;

    const studioBottomFill = new THREE.PointLight(0x168C91, 0.6, 14, 2);
    studioBottomFill.position.set(0, -5, 5);
    this.scene.add(studioBottomFill);

    // 5. Build 3D Architectural Portal
    this.buildPortal();

    // 6. Build 4 Realistic 3D Product Meshes
    this.buildProducts();

    // Window resize binding
    this.onWindowResize = () => {
      if (this.disposed || !this.camera || !this.renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', this.onWindowResize);

    // Start 60fps Animation Loop
    this.animate();
  },

  // Construct Architectural 3D Portal with Outer & Inner Rings
  buildPortal() {
    this.portalGroup = new THREE.Group();
    this.portalGroup.scale.set(0.85, 0.85, 0.85);

    // Outer Architectural Matte-Metallic Ring (Deep Teal)
    const outerGeo = new THREE.TorusGeometry(3.5, 0.22, 28, 96);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x143940,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.0
    });
    const outerRing = new THREE.Mesh(outerGeo, outerMat);
    this.portalGroup.add(outerRing);

    // Stepped Outer Bevel Trim
    const steppedGeo = new THREE.TorusGeometry(3.82, 0.05, 16, 96);
    const steppedMat = new THREE.MeshStandardMaterial({
      color: 0x1A4C56,
      metalness: 0.75,
      roughness: 0.3
    });
    const steppedRing = new THREE.Mesh(steppedGeo, steppedMat);
    this.portalGroup.add(steppedRing);

    // Coral Accent Outer Orbit Track
    const coralRingGeo = new THREE.TorusGeometry(3.6, 0.035, 16, 96);
    const coralRingMat = new THREE.MeshStandardMaterial({
      color: 0xF07861,
      emissive: 0xF07861,
      emissiveIntensity: 1.6,
      roughness: 0.2
    });
    const coralRing = new THREE.Mesh(coralRingGeo, coralRingMat);
    this.portalGroup.add(coralRing);

    // Inner Rotating Architectural Ring
    this.innerRingGroup = new THREE.Group();
    const innerGeo = new THREE.TorusGeometry(2.82, 0.12, 20, 80);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x168C91,
      metalness: 0.8,
      roughness: 0.28
    });
    const innerRingMesh = new THREE.Mesh(innerGeo, innerMat);
    this.innerRingGroup.add(innerRingMesh);

    // 12 Architectural Teeth / Segment Markers on Inner Ring
    const toothGeo = new THREE.BoxGeometry(0.06, 0.32, 0.06);
    const toothMat = new THREE.MeshStandardMaterial({ color: 0xF7F4EC, metalness: 0.9, roughness: 0.2 });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(Math.cos(angle) * 2.82, Math.sin(angle) * 2.82, 0);
      tooth.rotation.z = angle;
      this.innerRingGroup.add(tooth);
    }
    this.portalGroup.add(this.innerRingGroup);

    // Coral Traveling Pulse Orb
    const pulseGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xF5A08D });
    this.coralPulse = new THREE.Mesh(pulseGeo, pulseMat);
    this.coralPulse.position.set(3.6, 0, 0.15);
    this.portalGroup.add(this.coralPulse);

    // Central Dark Aperture Depth Opening
    const voidGeo = new THREE.CircleGeometry(2.68, 64);
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x071518 });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    voidMesh.position.z = -0.05;
    this.portalGroup.add(voidMesh);

    this.scene.add(this.portalGroup);
  },

  // Build 4 Realistic Representative 3D Products: Laptop, Smartphone, Headphones, Sneaker
  buildProducts() {
    this.productsGroup = new THREE.Group();

    // Common Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1C2529, metalness: 0.9, roughness: 0.22 });
    const tealMetalMat = new THREE.MeshStandardMaterial({ color: 0x168C91, metalness: 0.85, roughness: 0.28 });
    const coralMat = new THREE.MeshStandardMaterial({ color: 0xF07861, roughness: 0.35, metalness: 0.2 });
    const glassScreenMat = new THREE.MeshStandardMaterial({
      color: 0x081518,
      emissive: 0x168C91,
      emissiveIntensity: 0.3,
      metalness: 0.95,
      roughness: 0.1
    });

    // -------------------------------------------------------------------------
    // 1. LAPTOP (Top-Left Emergence)
    // -------------------------------------------------------------------------
    const laptopGroup = new THREE.Group();
    // Base Keyboard Chassis
    const baseGeo = new THREE.BoxGeometry(1.5, 0.045, 1.05);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
    laptopGroup.add(baseMesh);

    // Keyboard well indent
    const kbGeo = new THREE.BoxGeometry(1.3, 0.015, 0.58);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x111618, roughness: 0.6 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, 0.025, -0.1);
    laptopGroup.add(kbMesh);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.48, 0.01, 0.32);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x243238, roughness: 0.25 });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.position.set(0, 0.024, 0.32);
    laptopGroup.add(trackpadMesh);

    // Display Lid (Opened at 115 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.025, -0.52);

    const lidGeo = new THREE.BoxGeometry(1.5, 0.98, 0.035);
    const lidMesh = new THREE.Mesh(lidGeo, darkMetalMat);
    lidMesh.position.set(0, 0.49, 0);
    lidGroup.add(lidMesh);

    const screenGeo = new THREE.BoxGeometry(1.42, 0.9, 0.01);
    const screenMesh = new THREE.Mesh(screenGeo, glassScreenMat);
    screenMesh.position.set(0, 0.49, 0.02);
    lidGroup.add(screenMesh);

    lidGroup.rotation.x = -1.15;
    laptopGroup.add(lidGroup);

    laptopGroup.position.set(0, 0, -3.5);
    laptopGroup.scale.set(0.01, 0.01, 0.01);
    this.productMeshes.laptop = {
      group: laptopGroup,
      targetPos: new THREE.Vector3(-1.95, 1.15, 1.5),
      targetRot: new THREE.Euler(0.22, 0.35, -0.1),
      initialZ: -3.5
    };
    this.productsGroup.add(laptopGroup);

    // -------------------------------------------------------------------------
    // 2. SMARTPHONE (Bottom-Left Emergence)
    // -------------------------------------------------------------------------
    const phoneGroup = new THREE.Group();
    // Glass Body Slab
    const phoneBodyGeo = new THREE.BoxGeometry(0.72, 1.48, 0.06);
    const phoneBodyMesh = new THREE.Mesh(phoneBodyGeo, darkMetalMat);
    phoneGroup.add(phoneBodyMesh);

    // Titanium Outer Perimeter Rail
    const railGeo = new THREE.BoxGeometry(0.74, 1.5, 0.05);
    const railMesh = new THREE.Mesh(railGeo, tealMetalMat);
    phoneGroup.add(railMesh);

    // Front OLED Glass Display
    const phoneScreenGeo = new THREE.BoxGeometry(0.68, 1.42, 0.01);
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, glassScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.032);
    phoneGroup.add(phoneScreenMesh);

    // Back Camera Island & Lenses
    const camIslandGeo = new THREE.BoxGeometry(0.28, 0.36, 0.03);
    const camIslandMesh = new THREE.Mesh(camIslandGeo, darkMetalMat);
    camIslandMesh.position.set(0.18, 0.5, -0.04);
    phoneGroup.add(camIslandMesh);

    const lensGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16);
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x050C0E, metalness: 0.95, roughness: 0.1 });
    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.rotation.x = Math.PI / 2;
    lens1.position.set(0.18, 0.56, -0.055);
    phoneGroup.add(lens1);

    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.rotation.x = Math.PI / 2;
    lens2.position.set(0.18, 0.44, -0.055);
    phoneGroup.add(lens2);

    phoneGroup.position.set(0, 0, -3.5);
    phoneGroup.scale.set(0.01, 0.01, 0.01);
    this.productMeshes.smartphone = {
      group: phoneGroup,
      targetPos: new THREE.Vector3(-1.75, -1.2, 1.65),
      targetRot: new THREE.Euler(-0.35, 0.32, 0.18),
      initialZ: -3.5
    };
    this.productsGroup.add(phoneGroup);

    // -------------------------------------------------------------------------
    // 3. OVER-EAR HEADPHONES (Top-Right Emergence)
    // -------------------------------------------------------------------------
    const hpGroup = new THREE.Group();
    // Headband Arc
    const bandGeo = new THREE.TorusGeometry(0.82, 0.048, 16, 48, Math.PI * 0.88);
    const bandMesh = new THREE.Mesh(bandGeo, tealMetalMat);
    bandMesh.rotation.z = Math.PI * 0.06;
    hpGroup.add(bandMesh);

    // Inner Comfort Cushion
    const cushionGeo = new THREE.TorusGeometry(0.77, 0.032, 12, 40, Math.PI * 0.7);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0x162226, roughness: 0.6 });
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMat);
    cushionMesh.rotation.z = Math.PI * 0.15;
    hpGroup.add(cushionMesh);

    // Twin Earcups (Left & Right)
    const earcupGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.22, 32);
    const padGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 28);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x11191C, roughness: 0.5 });
    const accentTrimGeo = new THREE.TorusGeometry(0.37, 0.018, 12, 32);

    // Left Cup
    const cupLeft = new THREE.Group();
    cupLeft.position.set(-0.8, -0.42, 0);
    const cupLeftBody = new THREE.Mesh(earcupGeo, darkMetalMat);
    cupLeftBody.rotation.z = Math.PI / 2;
    cupLeft.add(cupLeftBody);
    const cupLeftPad = new THREE.Mesh(padGeo, padMat);
    cupLeftPad.position.x = 0.08;
    cupLeftPad.rotation.y = Math.PI / 2;
    cupLeft.add(cupLeftPad);
    const cupLeftTrim = new THREE.Mesh(accentTrimGeo, coralMat);
    cupLeftTrim.position.x = -0.11;
    cupLeftTrim.rotation.y = Math.PI / 2;
    cupLeft.add(cupLeftTrim);
    hpGroup.add(cupLeft);

    // Right Cup
    const cupRight = new THREE.Group();
    cupRight.position.set(0.8, -0.42, 0);
    const cupRightBody = new THREE.Mesh(earcupGeo, darkMetalMat);
    cupRightBody.rotation.z = Math.PI / 2;
    cupRight.add(cupRightBody);
    const cupRightPad = new THREE.Mesh(padGeo, padMat);
    cupRightPad.position.x = -0.08;
    cupRightPad.rotation.y = Math.PI / 2;
    cupRight.add(cupRightPad);
    const cupRightTrim = new THREE.Mesh(accentTrimGeo, coralMat);
    cupRightTrim.position.x = 0.11;
    cupRightTrim.rotation.y = Math.PI / 2;
    cupRight.add(cupRightTrim);
    hpGroup.add(cupRight);

    hpGroup.position.set(0, 0, -3.5);
    hpGroup.scale.set(0.01, 0.01, 0.01);
    this.productMeshes.headphones = {
      group: hpGroup,
      targetPos: new THREE.Vector3(1.85, 1.2, 1.55),
      targetRot: new THREE.Euler(0.28, -0.38, 0.12),
      initialZ: -3.5
    };
    this.productsGroup.add(hpGroup);

    // -------------------------------------------------------------------------
    // 4. ATHLETIC SNEAKER (Bottom-Right Emergence)
    // -------------------------------------------------------------------------
    const sneakerGroup = new THREE.Group();
    // Aerodynamic Sculptural Outsole / Midsole
    const soleGeo = new THREE.BoxGeometry(1.6, 0.22, 0.65);
    const soleMat = new THREE.MeshStandardMaterial({ color: 0xF7F4EC, roughness: 0.35, metalness: 0.1 });
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.set(0, -0.22, 0);
    sneakerGroup.add(soleMesh);

    // Upper Engineered Mesh Body
    const upperGeo = new THREE.BoxGeometry(1.5, 0.45, 0.58);
    const upperMat = new THREE.MeshStandardMaterial({ color: 0x18343B, roughness: 0.6, metalness: 0.2 });
    const upperMesh = new THREE.Mesh(upperGeo, upperMat);
    upperMesh.position.set(0, 0.06, 0);
    sneakerGroup.add(upperMesh);

    // Toe Cap Arc
    const toeGeo = new THREE.SphereGeometry(0.34, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const toeMesh = new THREE.Mesh(toeGeo, darkMetalMat);
    toeMesh.position.set(0.68, 0.02, 0);
    toeMesh.rotation.z = -Math.PI / 2;
    sneakerGroup.add(toeMesh);

    // Dynamic Signature Coral Flank Sweep Stripe
    const stripeGeo = new THREE.BoxGeometry(1.0, 0.09, 0.62);
    const stripeMesh = new THREE.Mesh(stripeGeo, coralMat);
    stripeMesh.position.set(-0.05, 0.08, 0);
    stripeMesh.rotation.z = -0.14;
    sneakerGroup.add(stripeMesh);

    // Heel Collar Padding
    const heelCollarGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.3, 16);
    const heelCollarMesh = new THREE.Mesh(heelCollarGeo, darkMetalMat);
    heelCollarMesh.position.set(-0.52, 0.32, 0);
    sneakerGroup.add(heelCollarMesh);

    sneakerGroup.position.set(0, 0, -3.5);
    sneakerGroup.scale.set(0.01, 0.01, 0.01);
    this.productMeshes.sneaker = {
      group: sneakerGroup,
      targetPos: new THREE.Vector3(1.8, -1.15, 1.45),
      targetRot: new THREE.Euler(-0.25, -0.4, 0.2),
      initialZ: -3.5
    };
    this.productsGroup.add(sneakerGroup);

    this.scene.add(this.productsGroup);
  },

  // Cubic Ease-In-Out for natural cinematic motion
  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },

  easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },

  // 60fps Animation Loop orchestrating the 3.5s sequence
  animate() {
    if (this.disposed) return;
    this.animFrameId = requestAnimationFrame(() => this.animate());

    const t = this.clock ? this.clock.getElapsedTime() : 0;

    // -------------------------------------------------------------------------
    // SCENE 1 (0.0s – 0.7s): Portal Appearance & Soft Teal Illumination
    // -------------------------------------------------------------------------
    if (t < 0.7) {
      const p1 = Math.min(1, t / 0.7);
      const ease1 = this.easeInOutCubic(p1);
      if (this.portalGroup) {
        this.portalGroup.scale.set(0.75 + ease1 * 0.15, 0.75 + ease1 * 0.15, 0.75 + ease1 * 0.15);
      }
      if (this.camera) {
        this.camera.position.z = 11.2 - ease1 * 0.4;
      }
    }

    // -------------------------------------------------------------------------
    // SCENE 2 (0.7s – 1.5s): Inner Ring Rotation & Coral Light Traversal
    // -------------------------------------------------------------------------
    if (t >= 0.7) {
      // Continuous rotation of inner ring
      if (this.innerRingGroup) {
        this.innerRingGroup.rotation.z = (t - 0.7) * 0.85;
      }

      // Coral accent light travels along outer circular track
      if (this.coralPulse) {
        const pulseAngle = (t - 0.7) * 4.2;
        this.coralPulse.position.x = Math.cos(pulseAngle) * 3.6;
        this.coralPulse.position.y = Math.sin(pulseAngle) * 3.6;
      }

      // Camera gentle forward dolly
      if (this.camera && t < 2.5) {
        this.camera.position.z = 10.8 - (t - 0.7) * 0.45;
      }
    }

    // -------------------------------------------------------------------------
    // SCENE 3 (1.5s – 2.5s): Product Emergence Animation (Laptop, Phone, Headphones, Sneaker)
    // -------------------------------------------------------------------------
    if (t >= 1.5) {
      const emergeProgress = Math.min(1, (t - 1.5) / 1.0);
      const easeEmerge = this.easeInOutCubic(emergeProgress);

      for (const key in this.productMeshes) {
        const item = this.productMeshes[key];
        // Staggered emergence delay per category
        let delay = 0;
        if (key === 'smartphone') delay = 0.08;
        else if (key === 'headphones') delay = 0.16;
        else if (key === 'sneaker') delay = 0.24;

        const itemT = Math.max(0, Math.min(1, (t - 1.5 - delay) / 0.82));
        const itemEase = this.easeInOutCubic(itemT);

        // Smooth position emergence from center portal out to balanced composition
        item.group.position.x = item.targetPos.x * itemEase;
        item.group.position.y = item.targetPos.y * itemEase;
        item.group.position.z = item.initialZ + (item.targetPos.z - item.initialZ) * itemEase;

        // Smooth rotation to display studio silhouette
        item.group.rotation.x = item.targetRot.x * itemEase;
        item.group.rotation.y = item.targetRot.y * itemEase;
        item.group.rotation.z = item.targetRot.z * itemEase;

        // Scale expansion
        const targetScale = 0.88;
        const scaleVal = Math.max(0.01, targetScale * itemEase);
        item.group.scale.set(scaleVal, scaleVal, scaleVal);
      }
    }

    // -------------------------------------------------------------------------
    // SCENE 4 (2.5s – 3.2s): Brand Reveal & Settling
    // -------------------------------------------------------------------------
    if (t >= 2.5) {
      // Subtle organic floating breathing on products
      const floatOffset = Math.sin((t - 2.5) * 2.5) * 0.025;
      for (const key in this.productMeshes) {
        const item = this.productMeshes[key];
        item.group.position.y = item.targetPos.y + floatOffset;
      }

      // Reveal 2D HTML/SVG Brand overlay
      const brandReveal = document.getElementById('splash-brand-reveal');
      if (brandReveal && !brandReveal.classList.contains('active')) {
        brandReveal.classList.add('active');
      }
    }

    // -------------------------------------------------------------------------
    // SCENE 5 (3.2s – 3.8s): Fluid Transition to Login / Register Gateway
    // -------------------------------------------------------------------------
    if (t >= 3.6 && !this.isFinished) {
      this.dismiss();
    }

    // Render WebGL frame
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  },

  // Fallback for non-WebGL / Reduced Motion environments
  initFallback(splashEl) {
    const container = document.getElementById('splash-canvas-container');
    if (container) {
      container.innerHTML = `
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #163E48 0%, #0E2429 80%);">
          <div style="width: 240px; height: 240px; border-radius: 50%; border: 3px solid #168C91; box-shadow: 0 0 30px rgba(22,140,145,0.4), inset 0 0 30px rgba(240,120,97,0.3); display: flex; align-items: center; justify-content: center;">
            <img src="assets/images/logo.svg" alt="AI Shopping Assistant" style="width: 100px; height: 100px;" />
          </div>
        </div>
      `;
    }

    const brandReveal = document.getElementById('splash-brand-reveal');
    if (brandReveal) brandReveal.classList.add('active');

    setTimeout(() => {
      this.dismiss();
    }, 2800);
  },

  // Complete Splash Transition & Resource Cleanup
  dismiss() {
    if (this.isFinished) return;
    this.isFinished = true;

    const splashEl = document.getElementById('splash-screen');
    if (splashEl) {
      splashEl.classList.add('fade-out');
      setTimeout(() => {
        splashEl.style.display = 'none';
      }, 600);
    }

    sessionStorage.setItem('shopai_splash_done', 'true');

    // Clean up Three.js WebGL resources to avoid memory leaks
    setTimeout(() => {
      this.disposeScene();
    }, 650);

    // Route to appropriate view
    if (window.App) {
      if (!Store.isAuthenticated) {
        App.activeView = 'auth';
      } else {
        App.activeView = (Store.user && Store.user.role === 'merchant') ? 'merchant' : 'home';
      }
      App.renderNavbarLinks();
      App.renderCurrentView();
    }
  },

  disposeScene() {
    if (this.disposed) return;
    this.disposed = true;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    window.removeEventListener('resize', this.onWindowResize);

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      const dom = this.renderer.domElement;
      if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
      this.renderer = null;
    }
  }
};

// Global export
window.PortalSplash = PortalSplash;
