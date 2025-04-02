//JavaScript for slider loop animation 
let slider = document.querySelector(".slider");
let animationFrame;
let isHovered = false;
let lastWindowWidth = window.innerWidth;

function updateSlider() {
  const viewportWidth = window.innerWidth;
  if (Math.abs(viewportWidth - lastWindowWidth) > 50) {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    lastWindowWidth = viewportWidth;
  }
}

function animate() {
  const currentPosition = parseFloat(
    getComputedStyle(slider).transform.split(",")[4] || 0
  );
  const speed = isHovered ? 1.0 : 2.4; // Adjusted hover speed
  const newPosition = currentPosition - speed;

  if (-newPosition >= slider.scrollWidth / 2) {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    void slider.scrollWidth; // Force reflow
  }

  slider.style.transition = "transform 0.1s linear";
  slider.style.transform = `translateX(${newPosition}px)`;
  animationFrame = requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener("resize", () => {
  updateSlider();
  cancelAnimationFrame(animationFrame);
  animate();
});

// Initialize
updateSlider();
animate();

// Hover event listeners (mouse)
slider.addEventListener("mouseenter", () => {
  isHovered = true;
});

slider.addEventListener("mouseleave", () => {
  isHovered = false;
});


//JavaScript for touch-hover for smartphone
document.addEventListener("DOMContentLoaded", function () {
  // Function to check if the device supports touch events
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // If it's a touch device, add touch event listeners to elements with hover effects
  if (isTouchDevice()) {
    const hoverableElements = document.querySelectorAll(
      ".wua-col, .starten-col, .mhi-box, .vision-col img, .hauptf-col .layer"
    );

    hoverableElements.forEach(function (element) {
      // Add touchstart listener
      element.addEventListener("touchstart", function (event) {
        this.classList.add("touch-hover");
      });

      // Add touchend listener
      element.addEventListener("touchend", function (event) {
        this.classList.remove("touch-hover");
      });

      // Add touchcancel listener to remove hover state if touch is interrupted
      element.addEventListener("touchcancel", function (event) {
        this.classList.remove("touch-hover");
      });
    });
  }
});