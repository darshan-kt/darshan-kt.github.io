document.addEventListener('DOMContentLoaded', () => {
  const slideshowContainer = document.querySelector('.background-slideshow');

  // List of background files (video file excluded)
  const files = [
    'assets/images/background/nova1.jpg',
    'assets/images/background/nova2.jpg',
    'assets/images/background/robot1.jpg',
    'assets/images/background/robot2.jpg',
    'assets/images/background/robot4.jpg',
    'assets/images/background/robot5.jpg',
    'assets/images/background/robot6.jpg'
  ];

  let currentImage = '';

  function changeBackground() {
    // Fade out the current image
    slideshowContainer.style.opacity = 0;
    setTimeout(() => {
      // Randomly select a new image (ensure it’s different from the current one)
      let newImage;
      do {
        newImage = files[Math.floor(Math.random() * files.length)];
      } while (newImage === currentImage && files.length > 1);
      currentImage = newImage;

      // Update the background image and fade in
      slideshowContainer.style.backgroundImage = `url('${currentImage}')`;
      slideshowContainer.style.opacity = 2.5;
    }, 1300); // Fade-out duration: 1.5 seconds
  }

  // Initialize with a random image
  currentImage = files[Math.floor(Math.random() * files.length)];
  slideshowContainer.style.backgroundImage = `url('${currentImage}')`;

  // Change background periodically (adjust timing as desired)
  setInterval(changeBackground, 5000);
});