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
    }, 1300); // Fade-out duration
  }

  // Initialize with a random image
  currentImage = files[Math.floor(Math.random() * files.length)];
  slideshowContainer.style.backgroundImage = `url('${currentImage}')`;

  // Change background periodically
  setInterval(changeBackground, 5000);

  // === Projects "More Projects" Functionality ===
  const projectCards = document.querySelectorAll('.project-grid .project-card');
  const toggleBtn = document.getElementById('toggleProjects');
  const batchSize = 3;
  const totalProjects = projectCards.length;
  let currentBatch = 1; // Number of fully revealed batches (excluding preview)

  // For mobile: Show all projects without blur and hide the toggle button.
  if (window.innerWidth <= 768) {
    projectCards.forEach(card => {
      card.style.display = 'block';
      card.classList.remove('blurred');
    });
    toggleBtn.style.display = 'none';
    return; // Skip the rest for mobile users
  }

  // Set the initial state for desktop:
  // - Batch 1: fully visible
  // - Batch 2: preview (blurred) if exists
  // - Remaining batches: hidden
  function setInitialState() {
    // Fully reveal the first batch
    for (let i = 0; i < batchSize; i++) {
      if (i < totalProjects) {
        projectCards[i].style.display = 'block';
        projectCards[i].classList.remove('blurred');
      }
    }
    // Show the next batch as a blurred preview (if it exists)
    for (let i = batchSize; i < Math.min(2 * batchSize, totalProjects); i++) {
      projectCards[i].style.display = 'block';
      projectCards[i].classList.add('blurred');
    }
    // Hide the rest
    for (let i = 2 * batchSize; i < totalProjects; i++) {
      projectCards[i].style.display = 'none';
      projectCards[i].classList.remove('blurred');
    }
    currentBatch = 1;
    toggleBtn.textContent = "More Projects";
  }
  setInitialState();

  toggleBtn.addEventListener('click', function() {
    // If button text is "More Projects", reveal the next batch:
    if (toggleBtn.textContent.trim() === "More Projects") {
      // Remove blur from the current preview batch (indices: currentBatch*batchSize to (currentBatch+1)*batchSize - 1)
      let previewStart = currentBatch * batchSize;
      let previewEnd = Math.min((currentBatch + 1) * batchSize, totalProjects);
      for (let i = previewStart; i < previewEnd; i++) {
        projectCards[i].classList.remove('blurred');
      }
      currentBatch++;
      // Check if there's a new preview batch available:
      if (currentBatch * batchSize < totalProjects) {
        let nextPreviewStart = currentBatch * batchSize;
        let nextPreviewEnd = Math.min((currentBatch + 1) * batchSize, totalProjects);
        for (let i = nextPreviewStart; i < nextPreviewEnd; i++) {
          projectCards[i].style.display = 'block';
          projectCards[i].classList.add('blurred');
        }
        toggleBtn.textContent = "More Projects";
      } else {
        // No further preview batch available; all cards are now revealed.
        toggleBtn.textContent = "Show Less";
      }
    } else {
      // "Show Less" clicked; collapse back to the initial state.
      setInitialState();
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  });
});
