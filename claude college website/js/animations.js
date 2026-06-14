// ============================================
// SCROLL ANIMATIONS & REVEAL
// ============================================

(function () {
  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    els.forEach(el => revealObserver.observe(el));
  }

  // Stats counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const update = () => {
            current += step;
            if (current >= target) {
              el.textContent = target.toLocaleString();
            } else {
              el.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // Typing effect
  function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const texts = [
      'Future Engineers 🚀',
      'Innovators of Tomorrow',
      'Tech Leaders',
      'Problem Solvers',
      'Nation Builders 🇮🇳'
    ];

    let textIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const current = texts[textIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 800);
  }

  // Parallax on scroll
  function initParallax() {
    const hero = document.querySelector('.hero-video');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    }, { passive: true });
  }

  // Testimonial slider
  let currentSlide = 0;
  const totalSlides = 3;

  window.goToSlide = function (index) {
    currentSlide = index;
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.dot');
    if (!track) return;

    // On mobile, go to single slide
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  };

  // Auto-slide testimonials
  function initSlider() {
    setInterval(() => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;
      currentSlide = (currentSlide + 1) % totalSlides;
      window.goToSlide(currentSlide);
    }, 4500);
  }

  // Department tabs
  function initDeptTabs() {
    const tabs = document.querySelectorAll('.dept-tab');
    const contents = document.querySelectorAll('.dept-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        if (target) {
          target.classList.add('active');
          // Re-trigger reveal animations for new content
          const reveals = target.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
          reveals.forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });
    });

    // Activate from URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const tabBtn = document.querySelector(`[data-tab="${hash}"]`);
      if (tabBtn) tabBtn.click();
    }
  }

  // Bar chart animation
  function initBarChart() {
    const bars = document.querySelectorAll('.bar-fill');
    if (!bars.length) return;

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
      bar.style.animationPlayState = 'paused';
      barObserver.observe(bar);
    });
  }

  // INIT ALL
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    animateCounters();
    initTyping();
    initParallax();
    initSlider();
    initDeptTabs();
    initBarChart();
  });
})();
