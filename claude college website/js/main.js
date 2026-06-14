// ============================================
// MAIN JS - NAVBAR, CURSOR, FORMS, UTILS
// ============================================

(function () {

  // ---- NAVBAR ----
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    // Scroll progress bar
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    // Navbar scroll state
    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled > 80);
    }

    // Back to top
    if (backToTop) {
      backToTop.classList.toggle('visible', scrolled > 400);
    }
  }, { passive: true });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- HAMBURGER / MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const bars = hamburger.querySelectorAll('span');
      const isOpen = navMenu.classList.contains('open');
      if (bars.length >= 3) {
        bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
        bars[1].style.opacity = isOpen ? '0' : '1';
        bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '1';
        });
      });
    });
  }

  // ---- DARK / LIGHT MODE ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('pce-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('pce-theme') || 'light';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ---- CUSTOM CURSOR ----
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      raf = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .program-card, .event-card, .stat-card, input, select, textarea');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '0.5';
    });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- FORM SUBMISSIONS ----
  window.submitForm = function (e) {
    e.preventDefault();
    const form = document.getElementById('admissionForm');
    const success = document.getElementById('formSuccess');
    if (form && success) {
      // Generate random app ID
      const appId = 'PCE2026' + Math.random().toString(36).substr(2, 6).toUpperCase();
      const appIdEl = success.querySelector('.app-id');
      if (appIdEl) appIdEl.textContent = 'Application ID: ' + appId;

      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  window.submitContactForm = function (e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    if (form && success) {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // ---- MEGA MENU keyboard accessibility ----
  document.querySelectorAll('.mega-menu-parent').forEach(parent => {
    const toggle = parent.querySelector('.nav-link');
    const menu = parent.querySelector('.mega-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
        menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
      }
    });
  });

  // ---- PAGE LOAD ANIMATION ----
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  });

  // ---- ACTIVE NAV LINK based on scroll ----
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- LAZY IMAGE ENHANCEMENT ----
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.onload = () => { img.style.opacity = '1'; };
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));

  // ---- NOTIFICATION TOAST ----
  window.showToast = function (message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 90px; right: 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white; padding: 14px 24px; border-radius: 12px;
      font-weight: 600; font-size: 14px; z-index: 9999;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      transform: translateY(20px); opacity: 0;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
      display: flex; align-items: center; gap: 8px;
    `;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      });
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

})();
