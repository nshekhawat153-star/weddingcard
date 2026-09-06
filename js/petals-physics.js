/**
 * Royal Pastel Wedding Petals Physics Engine
 * Dreamy Cherry Blossoms, Baby Pink Rose Petals, Powder Baby Blue Petals,
 * Pearl White Jasmine, and Soft Rose Gold Shimmer Dust.
 */

class PetalSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.sparkles = [];
    this.maxPetals = 48; // Smooth 60 FPS on mobile
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    this.wind = { current: 0, target: 0, timer: 0 };
    this.isActive = true;

    // Pastel Floral Palette: Blossom, Baby Pink, Baby Blue, Pearl White, Cream
    this.colors = [
      { primary: '#FFAEC9', secondary: '#F48FB1', shadow: 'rgba(244, 143, 177, 0.3)', type: 'baby-pink' },
      { primary: '#FFC0CB', secondary: '#FFB6C1', shadow: 'rgba(255, 182, 193, 0.3)', type: 'blossom-pink' },
      { primary: '#FFD1DC', secondary: '#FDE2E4', shadow: 'rgba(253, 226, 228, 0.3)', type: 'light-pink' },
      { primary: '#BEE1E6', secondary: '#99C1DE', shadow: 'rgba(153, 193, 222, 0.3)', type: 'baby-blue' },
      { primary: '#D0E1FD', secondary: '#C5D8F6', shadow: 'rgba(197, 216, 246, 0.3)', type: 'powder-blue' },
      { primary: '#FFFFFF', secondary: '#FFF5F7', shadow: 'rgba(255, 240, 245, 0.4)', type: 'pearl-white' },
      { primary: '#FFF8F0', secondary: '#FDEED9', shadow: 'rgba(253, 238, 217, 0.3)', type: 'ivory-cream' }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Wind and mouse/touch turbulence
    window.addEventListener('mousemove', (e) => this.handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // Seed initial petals spread gracefully across viewport
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    // Shimmering Rose Gold Dust
    for (let i = 0; i < 30; i++) {
      this.sparkles.push(this.createSparkle(true));
    }

    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive) {
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.animate(t));
      }
    });

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.animate(t));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  handlePointerMove(x, y) {
    this.mouse.vx = (x - this.mouse.lastX) * 0.3;
    this.mouse.vy = (y - this.mouse.lastY) * 0.3;
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.lastX = x;
    this.mouse.lastY = y;
  }

  createPetal(randomY = false) {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const size = 11 + Math.random() * 15;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -size * 2,
      size: size,
      aspectRatio: 0.7 + Math.random() * 0.45,
      color: color,
      speedY: 0.9 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 1.0,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: (Math.random() - 0.5) * 0.035,
      vRotY: (Math.random() - 0.5) * 0.045,
      vRotZ: (Math.random() - 0.5) * 0.025,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.018 + Math.random() * 0.02,
      opacity: 0.7 + Math.random() * 0.3,
      isCherryBlossom: Math.random() > 0.4
    };
  }

  createSparkle(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -10,
      size: 1 + Math.random() * 2.2,
      speedY: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random(),
      fadeSpeed: 0.01 + Math.random() * 0.02,
      sparkleColor: Math.random() > 0.4 ? '#F4A6B8' : '#D4AF37'
    };
  }

  // "Phool Barsao" (Shower Petals) Celebration Burst
  burst(count = 60) {
    for (let i = 0; i < count; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const size = 13 + Math.random() * 18;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
      const force = 6 + Math.random() * 13;

      this.petals.push({
        x: this.width * 0.5 + (Math.random() - 0.5) * (this.width * 0.8),
        y: this.height + 20,
        size: size,
        aspectRatio: 0.75 + Math.random() * 0.4,
        color: color,
        speedY: Math.sin(angle) * force,
        speedX: Math.cos(angle) * force,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.09,
        vRotY: (Math.random() - 0.5) * 0.09,
        vRotZ: (Math.random() - 0.5) * 0.05,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.035,
        opacity: 0.95,
        isBurst: true,
        isCherryBlossom: Math.random() > 0.3
      });
    }

    // Extra rose-gold sparkles
    for (let i = 0; i < 35; i++) {
      this.sparkles.push({
        x: this.width * 0.5 + (Math.random() - 0.5) * (this.width * 0.8),
        y: this.height * 0.7 + (Math.random() - 0.5) * 200,
        size: 1.5 + Math.random() * 3,
        speedY: -(2 + Math.random() * 5),
        speedX: (Math.random() - 0.5) * 4,
        opacity: 1,
        fadeSpeed: 0.015,
        sparkleColor: '#F4A6B8'
      });
    }
  }

  updateWind() {
    this.wind.timer++;
    if (this.wind.timer % 120 === 0) {
      this.wind.target = (Math.random() - 0.5) * 1.6;
    }
    this.wind.current += (this.wind.target - this.wind.current) * 0.02;
  }

  animate(currentTime) {
    if (!this.isActive) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateWind();

    // 1. Draw Rose-Gold & Pink Sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.y += s.speedY;
      s.x += s.speedX + this.wind.current * 0.4;
      s.opacity += s.fadeSpeed;
      if (s.opacity > 1 || s.opacity < 0) s.fadeSpeed = -s.fadeSpeed;

      if (s.y > this.height + 20 || s.y < -30) {
        this.sparkles[i] = this.createSparkle();
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity)) * 0.8;
      this.ctx.fillStyle = s.sparkleColor;
      this.ctx.shadowColor = '#F4A6B8';
      this.ctx.shadowBlur = 6;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw 3D Tumbling Pastel Petals
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const p = this.petals[i];

      if (p.isBurst) {
        p.speedY += 0.25;
        p.speedX *= 0.98;
      } else {
        p.y += p.speedY;
        p.x += p.speedX + this.wind.current + Math.sin(p.y * p.swaySpeed + p.swayOffset) * 0.75;
      }

      p.y += p.isBurst ? p.speedY : 0;
      p.x += p.isBurst ? p.speedX : 0;

      p.rotX += p.vRotX;
      p.rotY += p.vRotY;
      p.rotZ += p.vRotZ;

      // Touch / mouse interaction
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (1 - dist / 120) * 3;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
        p.rotX += 0.08;
        p.rotZ += 0.08;
      }

      if (p.y > this.height + 50) {
        if (p.isBurst) {
          this.petals.splice(i, 1);
          continue;
        } else {
          this.petals[i] = this.createPetal();
          continue;
        }
      }

      this.drawPetal(p);
    }

    requestAnimationFrame((t) => this.animate(t));
  }

  drawPetal(p) {
    const scaleX = Math.cos(p.rotY);
    const scaleY = Math.sin(p.rotX);

    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotZ);
    this.ctx.scale(scaleX, scaleY);

    this.ctx.globalAlpha = p.opacity * Math.max(0.35, Math.abs(scaleX * scaleY));

    const w = p.size;
    const h = p.size * p.aspectRatio * 1.3;

    this.ctx.beginPath();
    if (p.isCherryBlossom) {
      // Sakura / Blossom petal with delicate notched tip
      this.ctx.moveTo(0, h * 0.6);
      this.ctx.bezierCurveTo(-w * 0.8, h * 0.3, -w * 0.9, -h * 0.3, -w * 0.3, -h * 0.6);
      this.ctx.lineTo(0, -h * 0.45); // small notch
      this.ctx.lineTo(w * 0.3, -h * 0.6);
      this.ctx.bezierCurveTo(w * 0.9, -h * 0.3, w * 0.8, h * 0.3, 0, h * 0.6);
    } else {
      // Curled Rose Petal
      this.ctx.moveTo(0, -h * 0.6);
      this.ctx.bezierCurveTo(w * 0.8, -h * 0.5, w * 0.9, h * 0.2, 0, h * 0.7);
      this.ctx.bezierCurveTo(-w * 0.9, h * 0.2, -w * 0.8, -h * 0.5, 0, -h * 0.6);
    }
    this.ctx.closePath();

    // Soft pastel gradient
    const grad = this.ctx.createRadialGradient(0, 0, 2, 0, 0, w);
    grad.addColorStop(0, p.color.primary);
    grad.addColorStop(0.75, p.color.secondary);
    grad.addColorStop(1, p.color.shadow);

    this.ctx.fillStyle = grad;
    this.ctx.shadowColor = p.color.shadow;
    this.ctx.shadowBlur = 4;
    this.ctx.fill();

    // Subtle center vein
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.lineWidth = 0.7;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -h * 0.4);
    this.ctx.lineTo(0, h * 0.4);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

window.PetalSimulation = PetalSimulation;
