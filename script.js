// ===== BACKGROUND SLIDESHOW =====
(function () {
  const container = document.querySelector('.background-slideshow');
  if (!container) return;

  const slides = [
    { src: 'assets/images/background/arm_robot_programming.gif', pos: 'center center' },
    { src: 'assets/images/background/autonomous_golfcart.jpg', pos: 'center center' },
    { src: 'assets/images/background/Bachelors_graduation.jpg', pos: 'center top' },
    { src: 'assets/images/background/Master_gradutaion.jpg', pos: 'center top' },
    { src: 'assets/images/background/openpose_git.gif', pos: 'center center' },
    { src: 'assets/images/background/robot_building1.jpg', pos: 'center center' },
    { src: 'assets/images/background/robot_building2.jpg', pos: 'center center' },
    { src: 'assets/images/background/turtlebot_experiment.jpg', pos: 'center center' },
    { src: 'assets/images/background/drone1.jpg', pos: 'center center' },
    { src: 'assets/images/background/drone2.jpg', pos: 'center center' },
    { src: 'assets/images/background/drone3.jpg', pos: 'center center' },
    { src: 'assets/images/background/hive_with_robots.png', pos: 'center center' },
    { src: 'assets/images/background/visit.jpeg', pos: 'center top' },
    { src: 'assets/images/background/with_turlebot_robot.jpg', pos: 'center top' }
  ];

  const img = document.createElement('img');
  img.alt = '';
  // Pin to all four edges and cover the full container at every window size
  Object.assign(img.style, {
    position:   'absolute',
    top:        '0',
    left:       '0',
    right:      '0',
    bottom:     '0',
    width:      '100%',
    height:     '100%',
    objectFit:  'contain',
    opacity:    '0.85',
    transition: 'opacity 1.5s ease',
    display:    'block'
  });
  img.src = slides[0].src;
  img.style.objectPosition = slides[0].pos;
  container.appendChild(img);

  let current = 0;

  function changeSlide() {
    img.style.opacity = '0';
    setTimeout(() => {
      current = (current + 1) % slides.length;
      img.src = slides[current].src;
      img.style.objectPosition = slides[current].pos;
      img.style.opacity = '0.85';
    }, 900);
  }

  setInterval(changeSlide, 5000);
})();

// ===== HAMBURGER MENU =====
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

// ===== ACTIVE NAV LINK ON SCROLL =====
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== SCROLL REVEAL =====
(function () {
  const elements = document.querySelectorAll(
    '.skill-card, .project-card, .education-item, .timeline-item, .contact-card, .stat-item, .section-header'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

// ===== WORKSHOP SLIDER =====
(function () {
  const sliderEl = document.getElementById('workshopSlider');
  if (!sliderEl) return;

  const slides = sliderEl.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('workshopDots');
  const prevBtn = document.getElementById('workshopPrev');
  const nextBtn = document.getElementById('workshopNext');

  if (!slides.length) return;

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  resetTimer();
})();

// ===== PAGE TRANSITIONS =====
(function () {
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;
      if (
        this.target === '_blank' ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) return;

      const target = this.href;
      const isSamePage = target.split('#')[0] === window.location.href.split('#')[0];
      if (isSamePage) return;

      e.preventDefault();
      document.body.classList.add('page-transition-leave');
      setTimeout(() => { window.location.href = target; }, 400);
    });
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.classList.remove('page-transition-leave');
    }
  });
})();
