document.addEventListener('DOMContentLoaded', () => {
  // === Background Slideshow ===
  const slideshowContainer = document.querySelector('.background-slideshow');
  const files = [
    'assets/images/background/nova1.jpg',
    'assets/images/background/nova2.jpg',
    'assets/images/background/robot1.jpg',
    'assets/images/background/robot2.jpg',
    'assets/images/background/robot4.jpg',
    'assets/images/background/robot5.jpg',
    'assets/images/background/robot6.jpg',
    'assets/images/background/class2.jpg'
  ];
  let currentImage = '';

  // Apply initial styles for smooth transition
  slideshowContainer.style.transition = 'opacity 1.5s linear';
  slideshowContainer.style.opacity = 0.3;

  function changeBackground() {
    let newImage;
    do {
      newImage = files[Math.floor(Math.random() * files.length)];
    } while (newImage === currentImage && files.length > 1);
    currentImage = newImage;
    
    slideshowContainer.style.backgroundImage = `url(${currentImage})`;
    slideshowContainer.style.opacity = 0.8;
  }

  // Initial background change
  changeBackground();

  // Set interval for background change
  setInterval(() => {
    slideshowContainer.style.opacity = 0;
    setTimeout(changeBackground, 800);
  }, 3700);

  // === Project Reveal Animation with Blurring Effect ===
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('blurred');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  projectCards.forEach((card) => {
    card.classList.add('blurred'); // Ensure blur is applied initially
    observer.observe(card);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider .slide');
  const next = document.querySelector('.slider .next');
  const prev = document.querySelector('.slider .prev');
  const dots = document.querySelectorAll('.dots-container .dot');

  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    }
    if (index < 0) {
      slideIndex = slides.length - 1;
    }
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === slideIndex) {
        slide.classList.add('active');
      }
    });
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (i === slideIndex) {
        dot.classList.add('active');
      }
    });
  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
  }

  next.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  prev.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide(i + 1);
    });
  });

  function currentSlide(index) {
    slideIndex = index - 1;
    showSlide(slideIndex);
    resetTimer();
  }

  // Auto-advance every 3 seconds
  let timer = setInterval(() => {
    nextSlide();
  }, 3000);

  // Reset the timer when user manually navigates
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  // Initialize first slide
  showSlide(slideIndex);
});

document.addEventListener('DOMContentLoaded', () => {
  // Smooth slide movement for achievements
  let achievementIndex = 0;
  const achievementSlides = document.querySelectorAll('.achievements-slider .slide');
  const achievementNext = document.querySelector('.achievements-slider .next');
  const achievementPrev = document.querySelector('.achievements-slider .prev');
  const achievementDots = document.querySelectorAll('.achievements-section .dot');
  let achievementTimer;

  function showAchievementSlide(index) {
    if (index >= achievementSlides.length) {
      achievementIndex = 0;
    }
    if (index < 0) {
      achievementIndex = achievementSlides.length - 1;
    }
    achievementSlides.forEach((slide) => {
      slide.style.transition = 'opacity 0.5s ease'; // Smooth transition
      slide.classList.remove('active');
    });
    achievementDots.forEach((dot) => {
      dot.classList.remove('active');
    });
    achievementSlides[achievementIndex].classList.add('active');
    achievementDots[achievementIndex].classList.add('active');
  }

  function nextAchievementSlide() {
    achievementIndex++;
    showAchievementSlide(achievementIndex);
  }

  function prevAchievementSlide() {
    achievementIndex--;
    showAchievementSlide(achievementIndex);
  }

  function resetAchievementTimer() {
    clearInterval(achievementTimer);
    achievementTimer = setInterval(nextAchievementSlide, 3000);
  }

  achievementNext.addEventListener('click', () => {
    nextAchievementSlide();
    resetAchievementTimer();
  });

  achievementPrev.addEventListener('click', () => {
    prevAchievementSlide();
    resetAchievementTimer();
  });

  achievementDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      achievementIndex = i;
      showAchievementSlide(achievementIndex);
      resetAchievementTimer();
    });
  });

  // Initialize first slide and auto-scroll
  showAchievementSlide(achievementIndex);
  achievementTimer = setInterval(nextAchievementSlide, 3000);

  // Smooth slide movement for workshops
  let workshopIndex = 0;
  const workshopSlides = document.querySelectorAll('.workshops-section .slide');
  const workshopNext = document.querySelector('.workshops-section .next');
  const workshopPrev = document.querySelector('.workshops-section .prev');
  const workshopDots = document.querySelectorAll('.workshops-section .dot');
  let workshopTimer;

  function showWorkshopSlide(index) {
    if (index >= workshopSlides.length) {
      workshopIndex = 0;
    }
    if (index < 0) {
      workshopIndex = workshopSlides.length - 1;
    }
    workshopSlides.forEach((slide) => {
      slide.style.transition = 'opacity 0.5s ease'; // Smooth transition
      slide.classList.remove('active');
    });
    workshopDots.forEach((dot) => {
      dot.classList.remove('active');
    });
    workshopSlides[workshopIndex].classList.add('active');
    workshopDots[workshopIndex].classList.add('active');
  }

  function nextWorkshopSlide() {
    workshopIndex++;
    showWorkshopSlide(workshopIndex);
  }

  function prevWorkshopSlide() {
    workshopIndex--;
    showWorkshopSlide(workshopIndex);
  }

  function resetWorkshopTimer() {
    clearInterval(workshopTimer);
    workshopTimer = setInterval(nextWorkshopSlide, 3000);
  }

  workshopNext.addEventListener('click', () => {
    nextWorkshopSlide();
    resetWorkshopTimer();
  });

  workshopPrev.addEventListener('click', () => {
    prevWorkshopSlide();
    resetWorkshopTimer();
  });

  workshopDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      workshopIndex = i;
      showWorkshopSlide(workshopIndex);
      resetWorkshopTimer();
    });
  });

  // Initialize first slide and auto-scroll
  showWorkshopSlide(workshopIndex);
  workshopTimer = setInterval(nextWorkshopSlide, 3000);
});
