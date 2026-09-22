/**
 * Main Application Logic & Dynamic UI Engine
 * Developer: Kanishk Awasthi
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI Content from js/data.js
  renderPortfolioContent();

  // 2. Setup Interactive Controllers
  const hasGSAP = initGSAPEngine();
  initPreloader();
  initNavbarScroll();
  initThemeToggle();
  initMobileNav();
  initTypewriter();
  initHeroPhoto();
  initScrollspy();
  initContactForm();
  initResumeDownload();
  initBackToTop();

  if (hasGSAP) {
    document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right')
      .forEach(element => element.classList.add('revealed'));
    initHeroGSAP();
    initScrollProgressGSAP();
    initScrollTriggerReveals();
    initCustomCursorGSAP();
    initMagneticButtonsGSAP();
    initCardSpotlightAndTiltGSAP();
  } else {
    initScrollReveal();
    initSkillBars();
    init3DTilt();
    initMagneticButtons();
    initCustomCursor();
  }
});

/* ==========================================================================
   1. DYNAMIC UI RENDERING ENGINE
   ========================================================================== */
function renderPortfolioContent() {
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA object missing in js/data.js');
    return;
  }

  const { personal, stats, skills, projects, training, education, certifications } = PORTFOLIO_DATA;

  // --- Hero Section ---
  const heroName = document.getElementById('hero-name');
  const heroDescription = document.getElementById('hero-description');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const socialRow = document.getElementById('social-row');

  if (heroName) heroName.textContent = personal.name;
  if (heroDescription) heroDescription.textContent = personal.bio;
  if (heroResumeBtn) {
    heroResumeBtn.href = personal.resumeUrl;
    heroResumeBtn.setAttribute('download', 'Kanishk_Awasthi_Resume.pdf');
  }

  if (socialRow) {
    socialRow.innerHTML = `
      <a href="${personal.github}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      <a href="mailto:${personal.email}" class="social-icon-btn" aria-label="Email"><i class="fas fa-envelope"></i></a>
    `;
  }

  // --- About Section ---
  const aboutBio = document.getElementById('about-bio');
  const statsContainer = document.getElementById('stats-container');

  if (aboutBio) {
    aboutBio.innerHTML = `
      <h3 class="bio-heading">Computer Science & Full-Stack Developer</h3>
      <p class="bio-paragraph">${personal.bio}</p>
      <div class="focus-tags">
        <span class="tag-badge"><i class="fas fa-code"></i> Full-Stack (React/Node/Express/Mongo)</span>
        <span class="tag-badge"><i class="fas fa-laptop-code"></i> DSA (C++/Python/Java)</span>
        <span class="tag-badge"><i class="fas fa-project-diagram"></i> System Architecture</span>
        <span class="tag-badge"><i class="fas fa-seedling"></i> Entrepreneurial Focus</span>
      </div>
    `;
  }

  if (statsContainer) {
    statsContainer.innerHTML = stats.map(s => `
      <div class="glass-card stat-card reveal-element">
        <div class="stat-icon"><i class="${getIconClass(s.icon)}"></i></div>
        <div class="stat-number">${s.value}</div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-suffix">${s.suffix}</div>
      </div>
    `).join('');
  }

  // --- Skills Section ---
  const languagesList = document.getElementById('languages-list');
  const webList = document.getElementById('web-list');
  const toolsList = document.getElementById('tools-list');
  const softSkillsList = document.getElementById('soft-skills-list');

  if (languagesList) languagesList.innerHTML = skills.languages.map(s => renderSkillItem(s)).join('');
  if (webList) webList.innerHTML = skills.web.map(s => renderSkillItem(s)).join('');
  if (toolsList) toolsList.innerHTML = skills.tools.map(s => renderSkillItem(s)).join('');

  if (softSkillsList) {
    softSkillsList.innerHTML = skills.softSkills.map(s => `
      <div class="soft-skill-card reveal-element">
        <i class="${s.icon}"></i>
        <h4>${s.name}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  // --- Projects Section ---
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(p => `
      <div class="glass-card project-card tilt-card reveal-element ${p.featured ? 'lead-project-card' : ''}" data-id="${p.id}" ${p.featured ? 'style="border-color: var(--accent-primary); box-shadow: 0 0 30px var(--accent-glow);"' : ''}>
        <div>
          <div class="project-header">
            <span class="project-status-pill ${p.type === 'placeholder' ? 'coming-soon' : ''}">${p.status}</span>
            <span class="tech-tag">${p.year}</span>
          </div>
          <h3 class="project-title" style="${p.featured ? 'font-size: 1.7rem; color: var(--accent-primary);' : ''}">${p.title}</h3>
          <p class="project-description">${p.description}</p>

          <ul class="project-features-list">
            ${p.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
          </ul>
        </div>

        <div>
          <div class="tech-stack-row">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div class="project-actions">
            ${p.type === 'completed' ? `
              <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">
                <i class="fab fa-github"></i> Code
              </a>
              <a href="${p.liveDemo}" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;" onclick="handleDemoClick(event, '${p.title}')">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            ` : `
              <button class="btn btn-secondary" disabled style="padding: 0.6rem 1.2rem; font-size: 0.85rem; opacity: 0.6; cursor: not-allowed;">
                <i class="fas fa-hourglass-half"></i> In Progress
              </button>
            `}
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Training Section ---
  const trainingContainer = document.getElementById('training-container');
  if (trainingContainer && training) {
    trainingContainer.innerHTML = training.map(t => `
      <div class="glass-card reveal-element" style="padding: 2.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 50px; height: 50px; border-radius: var(--radius-sm); background: var(--bg-surface-elevated); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: var(--accent-primary);">
              <i class="${t.icon}"></i>
            </div>
            <div>
              <h3 style="font-size: 1.35rem; font-weight: 800;">${t.title}</h3>
              <span style="color: var(--text-muted); font-size: 0.95rem;">${t.institution}</span>
            </div>
          </div>
          <span class="project-status-pill"><i class="far fa-calendar-alt"></i> ${t.period}</span>
        </div>

        <ul class="project-features-list" style="margin-top: 1.5rem; margin-bottom: 0;">
          ${t.bullets.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // --- Education Section ---
  const educationContainer = document.getElementById('education-container');
  if (educationContainer) {
    educationContainer.innerHTML = education.map(e => `
      <div class="timeline-item reveal-left">
        <div class="timeline-dot"><i class="${e.icon}"></i></div>
        <div class="glass-card timeline-card">
          <div class="timeline-period">${e.period}</div>
          <h3 class="timeline-degree">${e.degree}</h3>
          <div class="timeline-institution">
            <i class="fas fa-university"></i> ${e.institution} | ${e.location}
          </div>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${e.description}</p>
          <span class="timeline-score-pill">${e.score}</span>
        </div>
      </div>
    `).join('');
  }

  // --- Certifications Section ---
  const certsContainer = document.getElementById('certs-container');
  if (certsContainer) {
    certsContainer.innerHTML = certifications.map(c => `
      <div class="glass-card cert-card reveal-element">
        <div>
          <div class="cert-top">
            <div class="cert-icon-wrapper"><i class="${c.icon}"></i></div>
            <div>
              <h3 class="cert-title">${c.title}</h3>
              <span class="cert-issuer">${c.issuer}</span>
            </div>
          </div>
          <div class="cert-duration-badge"><i class="far fa-calendar-check"></i> Date: ${c.date}</div>
        </div>
        <div class="tech-stack-row" style="margin-top: 1rem; margin-bottom: 0;">
          ${c.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

function renderSkillItem(skill) {
  return `
    <div class="skill-item">
      <div class="skill-info">
        <span class="skill-name-group">
          <i class="${skill.icon}"></i>
          <span>${skill.name}</span>
        </span>
        <span class="skill-badge-tag">${skill.badge}</span>
      </div>
    </div>
  `;
}

function getIconClass(iconKey) {
  const map = {
    code: 'fas fa-code',
    academic: 'fas fa-graduation-cap',
    certificate: 'fas fa-certificate',
    location: 'fas fa-map-marker-alt'
  };
  return map[iconKey] || 'fas fa-star';
}

function handleDemoClick(e, projectTitle) {
  e.preventDefault();
  showToast(`Live demo for "${projectTitle}" is running locally. Connect your hosted URL in js/data.js!`);
}

function initResumeDownload() {
  const resumeLink = document.getElementById('hero-resume-btn');
  if (!resumeLink) return;

  resumeLink.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(resumeLink.href);
      if (!response.ok) throw new Error('Resume could not be downloaded');

      const resumeBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(resumeBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = 'Kanishk_Awasthi_Resume.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (error) {
      window.location.href = resumeLink.href;
    }
  });
}

/* ==========================================================================
   2. PRELOADER & THEME TOGGLE
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 400);
    };

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader, { once: true });
    }
  }
}

function initHeroPhoto() {
  const module = document.querySelector('.hero-photo-module');
  const frame = module?.querySelector('.photo-frame');
  const image = module?.querySelector('img');
  if (!module || !frame) return;

  if (image) {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallbackSrc;
      if (fallback && image.src !== new URL(fallback, window.location.href).href) image.src = fallback;
    }, { once: true });
  }

  window.addEventListener('load', () => {
    window.setTimeout(() => module.classList.add('photo-ready'), 650);
  }, { once: true });

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (desktopQuery.matches && !motionQuery.matches) {
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      module.style.setProperty('--photo-shift-x', `${x * -10}px`);
      module.style.setProperty('--photo-shift-y', `${y * -10}px`);
      module.style.setProperty('--photo-rotate-x', `${y * -4}deg`);
      module.style.setProperty('--photo-rotate-y', `${x * 4}deg`);
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      module.style.setProperty('--photo-shift-x', '0px');
      module.style.setProperty('--photo-shift-y', '0px');
      module.style.setProperty('--photo-rotate-x', '0deg');
      module.style.setProperty('--photo-rotate-y', '0deg');
    });
  }
}

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('ka_portfolio_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('ka_portfolio_theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight ? 'light' : 'dark');
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }
}

/* ==========================================================================
   3. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }, { passive: true });
}
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      toggleBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typing-text');
  if (!target || typeof PORTFOLIO_DATA === 'undefined') return;

  const taglines = PORTFOLIO_DATA.personal.typingTaglines;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = taglines[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % taglines.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   5. INTERSECTION OBSERVER ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

function initSkillBars() {
  const skillSection = document.getElementById('skills');
  const fills = document.querySelectorAll('.progress-bar-fill');

  if (skillSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach(fill => {
            const level = fill.getAttribute('data-level');
            fill.style.width = `${level}%`;
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
  }
}

/* ==========================================================================
   6. 3D TILT & MAGNETIC BUTTONS
   ========================================================================== */
function init3DTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const magBtns = document.querySelectorAll('.magnetic-btn');

  magBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   7. CUSTOM CURSOR (Desktop Fine Pointer Only)
   ========================================================================== */
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  function render() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(render);
  }
  render();

  // Hover scale on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.backgroundColor = 'rgba(0, 242, 254, 0.2)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM & MAILTO FALLBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const isValid = validateContactForm(nameInput, emailInput, messageInput);
    if (!isValid) {
      showToast('Please correct the highlighted fields.', 'error');
      return;
    }

    showToast('Opening your email app...');
    openMailto(name, email, message);
    form.reset();
    clearContactErrors([nameInput, emailInput, messageInput]);
  });

  [
    document.getElementById('contact-name'),
    document.getElementById('contact-email'),
    document.getElementById('contact-message')
  ].forEach(input => input.addEventListener('input', () => clearContactError(input)));
}

function validateContactForm(nameInput, emailInput, messageInput) {
  let isValid = true;
  const fields = [
    [nameInput, nameInput.value.trim() ? '' : 'Name is required.'],
    [emailInput, !emailInput.value.trim() ? 'Email is required.' : (!validateEmail(emailInput.value.trim()) ? 'Enter a valid email address.' : '')],
    [messageInput, messageInput.value.trim() ? '' : 'Message is required.']
  ];

  fields.forEach(([input, errorMessage]) => {
    setContactError(input, errorMessage);
    if (errorMessage) isValid = false;
  });
  return isValid;
}

function setContactError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.classList.toggle('input-error', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));
  if (error) error.textContent = message;
}

function clearContactError(input) {
  setContactError(input, '');
}

function clearContactErrors(inputs) {
  inputs.forEach(clearContactError);
}

function openMailto(name, email, message) {
  const recipient = PORTFOLIO_DATA.personal.email;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'error' ? 'fas fa-exclamation-circle' : (type === 'warning' ? 'fas fa-info-circle' : 'fas fa-check-circle');
  toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.style.opacity = '1';
        backBtn.style.pointerEvents = 'auto';
      } else {
        backBtn.style.opacity = '0';
        backBtn.style.pointerEvents = 'none';
      }
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   10. GSAP 3 & SCROLLTRIGGER ENGINE (ADVANCED ANIMATIONS)
   ========================================================================== */
function initGSAPEngine() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not detected. Using CSS fallback animations.');
    return false;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (typeof TextPlugin !== 'undefined') {
    gsap.registerPlugin(TextPlugin);
  }

  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  return true;
}

function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroElements = '.hero-badge, .hero-title, .typing-container, #hero-description, .hero-ctas, .social-links-row, .hero-photo-module';

  gsap.set(heroElements, { opacity: 1, y: 0, scale: 1 });

  if (isReducedMotion) {
    return;
  }

  const tl = gsap.timeline({ delay: 0.1 });

  tl.to('.hero-badge', {
    y: -30,
    duration: 0.8,
    ease: "back.out(1.7)"
  })
  .to('.hero-title', {
    y: 40,
    duration: 0.9,
    ease: "power3.out"
  }, "-=0.5")
  .to('#hero-name', {
    scale: 0.92,
    filter: "brightness(1.5)",
    duration: 0.7,
    ease: "back.out(1.4)"
  }, "-=0.4")
  .to('.typing-container', {
    y: 20,
    duration: 0.6
  }, "-=0.3")
  .to('#hero-description', {
    y: 25,
    duration: 0.7
  }, "-=0.4")
  .to('.hero-ctas .btn', {
    y: 25,
    scale: 0.9,
    stagger: 0.15,
    duration: 0.7,
    ease: "back.out(1.5)"
  }, "-=0.3")
  .to('#social-row .social-icon-btn', {
    y: 20,
    scale: 0.7,
    stagger: 0.08,
    duration: 0.5,
    ease: "back.out(2)"
  }, "-=0.4")
  .to('.hero-photo-module', {
    scale: 0.8,
    rotationY: -15,
    duration: 1.1,
    ease: "back.out(1.2)"
  }, "-=1.0");
}

function initScrollProgressGSAP() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar || typeof ScrollTrigger === 'undefined') return;

  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1
    }
  });
}

function initScrollTriggerReveals() {
  if (typeof ScrollTrigger === 'undefined') return;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // Section Headers Reveal
  const sectionHeaders = gsap.utils.toArray('.section-header');
  sectionHeaders.forEach(header => {
    gsap.from(header.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Cinematic Video Card Scale Reveal (0.94 -> 1)
  const cinematicVideo = document.querySelector('.cinematic-video-wrapper');
  if (cinematicVideo) {
    gsap.fromTo(cinematicVideo, 
      { scale: 0.94, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cinematicVideo,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.2
        }
      }
    );
  }

  // About Section & Bio Card
  const aboutBio = document.getElementById('about-bio');
  if (aboutBio) {
    gsap.fromTo(aboutBio,
      { x: -50, opacity: 1 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutBio,
        start: 'top 85%'
      }
      }
    );
  }

  // Stats Grid & Counter Roll-up Animation
  const statCards = gsap.utils.toArray('.stat-card');
  if (statCards.length > 0) {
    gsap.set(statCards, { opacity: 1 });
    gsap.from(statCards, {
      y: 45,
      scale: 0.92,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '#stats-container',
        start: 'top 85%',
        onEnter: () => animateStatNumbers()
      }
    });
  }

  // Skill Category Cards
  const skillCategoryCards = gsap.utils.toArray('.skill-category-card');
  if (skillCategoryCards.length > 0) {
    gsap.set(skillCategoryCards, { opacity: 1 });
    gsap.from(skillCategoryCards, {
      y: 45,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-wrapper',
        start: 'top 82%'
      }
    });
  }

  // Skill Progress Fills
  const skillFills = gsap.utils.toArray('.progress-bar-fill');
  skillFills.forEach(fill => {
    const targetLevel = fill.getAttribute('data-level');
    gsap.to(fill, {
      width: `${targetLevel}%`,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: fill,
        start: 'top 90%'
      }
    });
  });

  // Soft Skills Cards
  const softSkillCards = gsap.utils.toArray('.soft-skill-card');
  if (softSkillCards.length > 0) {
    gsap.set(softSkillCards, { opacity: 1 });
    gsap.from(softSkillCards, {
      scale: 0.85,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '#soft-skills-list',
        start: 'top 88%'
      }
    });
  }

  // Projects Grid Stagger Reveal
  const projectCards = gsap.utils.toArray('.project-card');
  if (projectCards.length > 0) {
    gsap.from(projectCards, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects-container',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // Summer Training Cards
  const trainingCards = gsap.utils.toArray('#training-container .glass-card');
  if (trainingCards.length > 0) {
    gsap.set(trainingCards, { opacity: 1 });
    gsap.from(trainingCards, {
      y: 50,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#training-container',
        start: 'top 85%'
      }
    });
  }

  // Education Timeline Items
  const timelineItems = gsap.utils.toArray('.timeline-item');
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      x: index % 2 === 0 ? -45 : 45,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      }
    });
  });

  // Certifications Cards
  const certCards = gsap.utils.toArray('.cert-card');
  if (certCards.length > 0) {
    gsap.set(certCards, { opacity: 1 });
    gsap.from(certCards, {
      y: 45,
      scale: 0.92,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '#certs-container',
        start: 'top 85%'
      }
    });
  }

  // Contact Info Cards & Contact Form
  const contactCards = gsap.utils.toArray('.contact-card-item');
  if (contactCards.length > 0) {
    gsap.from(contactCards, {
      x: -40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-info-column',
        start: 'top 85%'
      }
    });
  }

  const contactFormCard = document.querySelector('.contact-form-card');
  if (contactFormCard) {
    gsap.set(contactFormCard, { opacity: 1 });
    gsap.from(contactFormCard, {
      x: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactFormCard,
        start: 'top 85%'
      }
    });
  }
}

function animateStatNumbers() {
  const numberEls = document.querySelectorAll('.stat-number');
  numberEls.forEach(el => {
    const originalText = el.textContent.trim();
    const numericMatch = originalText.match(/\d+(\.\d+)?/);
    if (!numericMatch) return;

    const numericVal = parseFloat(numericMatch[0]);
    const prefix = originalText.substring(0, numericMatch.index);
    const suffix = originalText.substring(numericMatch.index + numericMatch[0].length);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericVal,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
      }
    });
  });
}

function initCustomCursorGSAP() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower || typeof gsap === 'undefined') return;

  const setCursorX = gsap.quickSetter(cursor, "x", "px");
  const setCursorY = gsap.quickSetter(cursor, "y", "px");
  const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.25, ease: "power3.out" });
  const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.25, ease: "power3.out" });

  window.addEventListener('mousemove', (e) => {
    setCursorX(e.clientX);
    setCursorY(e.clientY);
    setFollowerX(e.clientX);
    setFollowerY(e.clientY);
  }, { passive: true });

  document.body.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, textarea, .glass-card, .social-icon-btn');
    if (target) {
      gsap.to(cursor, { scale: 1.8, backgroundColor: 'rgba(0, 242, 254, 0.25)', duration: 0.2 });
      gsap.to(follower, { scale: 1.4, borderColor: 'var(--accent-primary)', duration: 0.2 });
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, input, textarea, .glass-card, .social-icon-btn');
    if (target) {
      gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
      gsap.to(follower, { scale: 1, borderColor: 'rgba(0, 242, 254, 0.4)', duration: 0.2 });
    }
  });
}

function initMagneticButtonsGSAP() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || typeof gsap === 'undefined') return;

  const magBtns = document.querySelectorAll('.magnetic-btn, .social-icon-btn');

  magBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        rotation: x * 0.04,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.4)'
      });
    });
  });
}

function initCardSpotlightAndTiltGSAP() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.glass-card, .soft-skill-card, .contact-card-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);

      if (card.classList.contains('tilt-card') && typeof gsap !== 'undefined') {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -9;
        const rotateY = ((x - centerX) / centerX) * 9;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          scale: 1.015,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('tilt-card') && typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });
  });
}
