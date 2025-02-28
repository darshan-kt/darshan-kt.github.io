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

  function changeBackground() {
    slideshowContainer.style.opacity = 0;
    setTimeout(() => {
      let newImage;
      do {
        newImage = files[Math.floor(Math.random() * files.length)];
      } while (newImage === currentImage && files.length > 1);
      currentImage = newImage;
      
      slideshowContainer.style.backgroundImage = `url(${currentImage})`;
      slideshowContainer.style.opacity = 1;
    }, 1000);
  }
  setInterval(changeBackground, 3000);

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
