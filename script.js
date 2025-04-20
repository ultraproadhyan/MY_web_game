 
 // Initialize particle.js background
 particlesJS("particles-js", {
  "particles": {
      "number": { 
          "value": window.innerWidth < 600 ? 40 : 80, 
          "density": { "enable": true, "value_area": 800 } 
      },
      "color": { "value": "#00fffc" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": true },
      "size": { "value": 3, "random": true },
      "line_linked": { 
          "enable": true, 
          "distance": window.innerWidth < 600 ? 100 : 150, 
          "color": "#00fffc", 
          "opacity": 0.4, 
          "width": 1 
      },
      "move": { 
          "enable": true, 
          "speed": window.innerWidth < 600 ? 2 : 3, 
          "direction": "none", 
          "random": true, 
          "straight": false, 
          "out_mode": "out" 
      }
  },
  "interactivity": {
      "detect_on": "canvas",
      "events": {
          "onhover": { "enable": true, "mode": "repulse" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
      }
  }
});

// Button click effect
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', function() {
  window.location.href = "YOUR_GAME_LINK_HERE";
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
      this.style.transform = 'scale(1)';
  }, 200);
});

// Handle navigation to ensure proper scrolling
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
      if(link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if(target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      }
  });
});

// Adjust layout on resize
window.addEventListener('resize', function() {
  if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      particlesJS("particles-js", particlesJSConfig);
  }
});
