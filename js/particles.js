/**
 * Hero Canvas Particle System - Throttled & Visibility Aware
 * 
 * Features:
 * - Dynamic particle rendering matching theme accent colors
 * - Pauses execution when tab is hidden or when Hero is scrolled out of viewport
 * - Lightweight particle density optimized for high performance across devices
 */

class HeroParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    this.isPaused = false;
    this.isHeroVisible = true;
    
    this.mouse = {
      x: null,
      y: null,
      radius: 120
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    this.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Adjust density based on screen size (max 45 particles desktop, 20 mobile)
    const count = this.width < 768 ? 22 : 45;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    }, { passive: true });

    // Desktop hover interaction
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
        } else {
          this.mouse.x = null;
          this.mouse.y = null;
        }
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      }, { passive: true });
    }

    // Visibility API: Pause when switching tabs
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.isHeroVisible) {
        this.start();
      }
    });

    // Intersection Observer: Pause when hero is scrolled out of view
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isHeroVisible = entry.isIntersecting;
          if (this.isHeroVisible && !document.hidden) {
            this.start();
          } else {
            this.pause();
          }
        });
      }, { threshold: 0.05 });
      
      observer.observe(heroSection);
    }
  }

  getColors() {
    const isDark = document.body.classList.contains('dark-theme') || !document.body.classList.contains('light-theme');
    return {
      particle: isDark ? 'rgba(0, 242, 254, ' : 'rgba(2, 132, 199, ',
      line: isDark ? 'rgba(0, 242, 254, ' : 'rgba(3, 105, 161, '
    };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const colors = this.getColors();

    // Draw connecting lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.25;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `${colors.line}${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Update & draw particles
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interactive pull
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mdx = this.mouse.x - p.x;
        const mdy = this.mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < this.mouse.radius) {
          const force = (this.mouse.radius - mdist) / this.mouse.radius;
          p.x -= (mdx / mdist) * force * 1.5;
          p.y -= (mdy / mdist) * force * 1.5;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${colors.particle}${p.alpha})`;
      this.ctx.fill();
    }
  }

  animate() {
    if (this.isPaused) return;
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (!this.isPaused && this.animationFrameId) return;
    this.isPaused = false;
    this.animate();
  }

  pause() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.heroParticles = new HeroParticles('hero-canvas');
});
