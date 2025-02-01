document.addEventListener("DOMContentLoaded", function() {
    const fadeInElements = document.querySelectorAll(".fade-in");
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, options);
    fadeInElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = "translateY(50px)";
        observer.observe(element);
    });
});