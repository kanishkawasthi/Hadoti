/**
 * Main Application Logic & Dynamic UI Engine
 * Developer: Kanishk Awasthi
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI Content from js/data.js
  renderPortfolioContent();

  // 2. Setup Interactive Controllers
  initPreloader();
  initThemeToggle();
  initMobileNav();
  initTypewriter();
  initScrollspy();
  initScrollReveal();
  initSkillBars();
  init3DTilt();
  initMagneticButtons();
  initCustomCursor();
  initContactForm();
  initResumeDownload();
  initBackToTop();
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
      <a href="${personal.linkedin}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
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
          <i class="${skill.icon}"></i> ${skill.name}
        </span>
        <span class="skill-badge-tag">${skill.badge} (${skill.level}%)</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" data-level="${skill.level}"></div>
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
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 400);
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
