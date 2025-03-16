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

  // Auto-advance every 3 seconds
  let timer = setInterval(() => {
    nextSlide();
  }, 5000);

  // Reset the timer when user manually navigates
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // Initialize first slide
  showSlide(slideIndex);
});
