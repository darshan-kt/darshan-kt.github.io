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

document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-grid .project-card');
  const toggleBtn = document.getElementById('toggleProjects');
  const batchSize = 3;

  // Hide all cards after the first batch on load
  for (let i = batchSize; i < projectCards.length; i++) {
    projectCards[i].style.display = 'none';
  }
  
  toggleBtn.addEventListener('click', function() {
    // Determine the number of currently visible cards
    const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
    
    if (visibleCards.length < projectCards.length) {
      // Reveal the next batch of cards
      const nextBatch = Array.from(projectCards).slice(visibleCards.length, visibleCards.length + batchSize);
      nextBatch.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = 0;
        setTimeout(() => {
          card.style.opacity = 1;
        }, 50);
      });
      // If all cards are now visible, change button text to "Show Less"
      if (visibleCards.length + nextBatch.length >= projectCards.length) {
        toggleBtn.textContent = "Show Less";
      }
    } else {
      // Collapse the view to only the first batch
      for (let i = batchSize; i < projectCards.length; i++) {
        projectCards[i].style.display = 'none';
      }
      toggleBtn.textContent = "More Projects";
      // Optionally, scroll back to the Projects section
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-grid .project-card');
  const toggleBtn = document.getElementById('toggleProjects');
  const batchSize = 3;
  const totalProjects = projectCards.length;
  let currentBatch = 1; // Number of fully revealed batches (excluding preview)

  // Set the initial state:
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
    // If button shows "More Projects", then reveal the next batch:
    if (toggleBtn.textContent.trim() === "More Projects") {
      // Remove blur from the current preview batch (indices: currentBatch*batchSize to (currentBatch+1)*batchSize-1)
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
      // Optionally, scroll back to the Projects section:
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  });
});
