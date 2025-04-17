
 // Slider Functionality
 const sliderTrack = document.getElementById('sliderTrack');
 const slides = document.querySelectorAll('.slide');
 const prevBtn = document.getElementById('prevBtn');
 const nextBtn = document.getElementById('nextBtn');
 const dots = document.querySelectorAll('.pagination-dot');
 
 let currentIndex = 0;
 let autoSlideInterval;
 const slideCount = slides.length;
 
 // Initialize slider
 function initSlider() {
     updateSlider();
     startAutoSlide();
 }
 
 // Update slider position and active states
 function updateSlider() {
     // Update slide position
     sliderTrack.scrollTo({
         left: currentIndex * sliderTrack.offsetWidth,
         behavior: 'smooth'
     });
     
     // Update active classes
     slides.forEach((slide, index) => {
         slide.classList.toggle('active', index === currentIndex);
     });
     
     // Update pagination dots
     dots.forEach((dot, index) => {
         dot.classList.toggle('active', index === currentIndex);
         
         // Reset animation for active dot
         if (index === currentIndex) {
             dot.style.animation = 'none';
             void dot.offsetWidth; // Trigger reflow
             dot.style.animation = 'fillProgress 5s linear forwards';
         }
     });
 }
 
 // Go to specific slide
 function goToSlide(index) {
     currentIndex = (index + slideCount) % slideCount;
     updateSlider();
     resetAutoSlide();
 }
 
 // Next slide
 function nextSlide() {
     goToSlide(currentIndex + 1);
 }
 
 // Previous slide
 function prevSlide() {
     goToSlide(currentIndex - 1);
 }
 
 // Auto slide rotation
 function startAutoSlide() {
     autoSlideInterval = setInterval(nextSlide, 5000);
 }
 
 function resetAutoSlide() {
     clearInterval(autoSlideInterval);
     startAutoSlide();
 }
 
 // Event listeners
 prevBtn.addEventListener('click', prevSlide);
 nextBtn.addEventListener('click', nextSlide);
 
 dots.forEach((dot, index) => {
     dot.addEventListener('click', () => goToSlide(index));
 });
 
 // Pause auto-slide on hover
 sliderTrack.addEventListener('mouseenter', () => {
     clearInterval(autoSlideInterval);
 });
 
 sliderTrack.addEventListener('mouseleave', () => {
     resetAutoSlide();
 });
 
 // Touch support for mobile
 let touchStartX = 0;
 let touchEndX = 0;
 
 sliderTrack.addEventListener('touchstart', (e) => {
     touchStartX = e.changedTouches[0].clientX;
     clearInterval(autoSlideInterval);
 }, { passive: true });
 
 sliderTrack.addEventListener('touchend', (e) => {
     touchEndX = e.changedTouches[0].clientX;
     handleSwipe();
     resetAutoSlide();
 }, { passive: true });
 
 function handleSwipe() {
     const threshold = 50;
     
     if (touchEndX < touchStartX - threshold) {
         // Swipe left - next slide
         nextSlide();
     } else if (touchEndX > touchStartX + threshold) {
         // Swipe right - previous slide
         prevSlide();
     }
 }
 
 // Initialize on load
 window.addEventListener('load', initSlider);
 
 // Responsive adjustments on resize
 window.addEventListener('resize', () => {
     updateSlider();
 });

//  this is now table of winners
const data = [
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Rohit Sharma",
      time: "1m 30s",
      date: "2025-04-12",
      price:"₹200",
      position: "1"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Neha Verma",
      time: "2m 5s",
      date: "2025-04-10",
      price:"₹200",
      position: "2"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Amit Patel",
      time: "3m 12s",
      date: "2025-04-08",
      price:"₹200",
      position: "3"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Pooja Rani",
      time: "1m 55s",
      date: "2025-04-07",
      price:"₹200",
      position: "1"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Vikas Kumar",
      time: "2m 45s",
      date: "2025-04-05",
      price:"₹200",
      position: "2"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Alok Singh",
      time: "2m 20s",
      date: "2025-04-03",
      price:"₹200",
      position: "3"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Sana Sheikh",
      time: "1m 40s",
      date: "2025-04-01",
      price:"₹200",
      position: "1"
    },
    {
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOaBV-r4rkkCAA7eJfbrgZrZUYiPKXDawIhwsKdsdtv_fmkYD558wcNI&s",
      name: "Farhan Ali",
      time: "3m 00s",
      date: "2025-03-30",
      price:"₹200",
      position: "2"
    }
  ];

  const tableBody = document.getElementById("table-body");

  data.forEach(entry => {
    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <div class="table-cell">
        <div class="img-box">
          <img src="${entry.photo}" alt="User Photo" />
        </div>
      </div>
      <div class="table-cell">${entry.name}</div>
      <div class="table-cell">${entry.time}</div>
      <div class="table-cell">${entry.date}</div>
      <div class="table-cell">${entry.price}</div>
      <div class="table-cell">${entry.position}</div>
    `;

    tableBody.appendChild(row);
  });
// this is for comment box 
 // Same JavaScript as before
 let comments = JSON.parse(localStorage.getItem('comments')) || [];
        
 const commentInput = document.getElementById('commentInput');
 const submitBtn = document.getElementById('submitBtn');
 const commentsContainer = document.getElementById('commentsContainer');
 const wordCountEl = document.getElementById('wordCount');
 const commentCountEl = document.getElementById('commentCount');
 const errorMsg = document.getElementById('errorMsg');
 
 displayComments();
 updateCommentCount();
 
 commentInput.addEventListener('input', updateWordCount);
 submitBtn.addEventListener('click', addComment);
 
 function updateWordCount() {
     const text = commentInput.value.trim();
     const words = text ? text.split(/\s+/).length : 0;
     wordCountEl.textContent = words;
     
     if (words > 200) {
         wordCountEl.style.color = 'red';
         errorMsg.textContent = 'Comment exceeds 200 words limit!';
     } else {
         wordCountEl.style.color = '#666';
         errorMsg.textContent = '';
     }
 }
 
 function addEmoji(emoji) {
     const startPos = commentInput.selectionStart;
     const endPos = commentInput.selectionEnd;
     const text = commentInput.value;
     
     commentInput.value = text.substring(0, startPos) + emoji + text.substring(endPos);
     commentInput.focus();
     commentInput.selectionStart = startPos + emoji.length;
     commentInput.selectionEnd = startPos + emoji.length;
     
     updateWordCount();
 }
 
 function addComment() {
     const text = commentInput.value.trim();
     const words = text ? text.split(/\s+/).length : 0;
     
     if (!text) {
         errorMsg.textContent = 'Please write a comment!';
         return;
     }
     
     if (words > 200) {
         errorMsg.textContent = 'Comment exceeds 200 words limit!';
         return;
     }
     
     const newComment = {
         id: Date.now(),
         text: text,
         date: new Date().toLocaleString()
     };
     
     comments.unshift(newComment);
     
     if (comments.length > 100) {
         comments.pop();
     }
     
     localStorage.setItem('comments', JSON.stringify(comments));
     displayComments();
     updateCommentCount();
     
     commentInput.value = '';
     wordCountEl.textContent = '0';
     errorMsg.textContent = '';
 }
 
 function displayComments() {
     commentsContainer.innerHTML = '';
     
     if (comments.length === 0) {
         commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
         return;
     }
     
     comments.forEach(comment => {
         const commentEl = document.createElement('div');
         commentEl.className = 'comment-style';
         commentEl.innerHTML = `
             <div class="comment-meta-style">
                 <strong>User</strong> • ${comment.date}
             </div>
             <div class="comment-content-style">${comment.text}</div>
         `;
         commentsContainer.appendChild(commentEl);
     });
 }
 
 function updateCommentCount() {
     commentCountEl.textContent = comments.length;
 }

init();

// स्क्रीन पर एनिमेटेड कंटेंट दिखाने के लिए
const screen = document.querySelector('.screen');
setInterval(() => {
  screen.style.background = `linear-gradient(135deg, 
    hsl(${Math.random() * 360}, 80%, 60%), 
    hsl(${Math.random() * 360}, 80%, 60%))`;
}, 500);
/* Modern Button Styles - Self Contained */
  .modern-button {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    /* Sizing - Responsive */
    padding: 14px 28px;
    font-size: 16px;
    
    /* Visual Design */
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    
    /* Effects */
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }

  /* Hover States */
  .modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  }
  
  /* Active State */
  .modern-button:active {
    transform: translateY(1px);
  }

  /* Text and Icon */
  .button-text {
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  .button-icon {
    transition: transform 0.3s ease;
  }
  
  .modern-button:hover .button-icon {
    transform: translateX(3px);
  }

  /* Ripple Effect */
  .modern-button::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 1%, transparent 1%) center/15000%;
    opacity: 0;
    transition: opacity 0.5s, background-size 0.5s;
  }
  
  .modern-button:active::after {
    background-size: 100%;
    opacity: 1;
    transition: 0s;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .modern-button {
      padding: 12px 24px;
      font-size: 15px;
    }
  }
