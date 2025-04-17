//  button link change 
// button-config.js
const BUTTON_CONFIG = {
    link: "testcomingsoon.html"  // Change this to update all buttons
    
};

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
  // Sample video data
const videoData = [
    {
        id: "dQw4w9WgXcQ",
        title: "How to Register for Daily Quiz Battle",
        desc: "Step-by-step guide to create your account and start playing",
        duration: "3:45",
        views: "7.2K",
        category: "tutorials",
        thumb: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },
    {
        id: "9bZkp7q19f0",
        title: "Prize Withdrawal Process Explained",
        desc: "Learn how to withdraw your winnings to UPI or bank account",
        duration: "4:20",
        views: "5.8K",
        category: "guides",
        thumb: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg"
    },
    {
        id: "kJQP7kiw5Fk",
        title: "My First Win - User Experience",
        desc: "Priya shares her experience winning ₹500 on her first attempt",
        duration: "2:30",
        views: "3.5K",
        category: "users",
        thumb: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg"
    },
    {
        id: "JGwWNGJdvx8",
        title: "Daily Quiz Battle Short - Quick Tip",
        desc: "15-second tip to improve your response time",
        duration: "0:15",
        views: "12K",
        category: "shorts",
        thumb: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg"
    },
    {
        id: "nYh-n7EOtMA",
        title: "Understanding the Scoring System",
        desc: "How points are calculated and leaderboard works",
        duration: "6:10",
        views: "4.3K",
        category: "guides",
        thumb: "https://i.ytimg.com/vi/nYh-n7EOtMA/hqdefault.jpg"
    },
    {
        id: "QNJL6nfu__Q",
        title: "Common Mistakes to Avoid",
        desc: "5 mistakes that reduce your chances of winning",
        duration: "5:45",
        views: "8.1K",
        category: "tutorials",
        thumb: "https://i.ytimg.com/vi/QNJL6nfu__Q/hqdefault.jpg"
    },
    {
        id: "FlsCjmMhFmw",
        title: "Winner Celebration - ₹2000 Prize",
        desc: "Ravi celebrates his big win with family",
        duration: "1:45",
        views: "2.7K",
        category: "users",
        thumb: "https://i.ytimg.com/vi/FlsCjmMhFmw/hqdefault.jpg"
    },
    {
        id: "JGwWNGJdvx8",
        title: "Short: Code Entry Tutorial",
        desc: "Quick guide to entering your quiz code",
        duration: "0:30",
        views: "9.3K",
        category: "shorts",
        thumb: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg"
    }
];

// DOM Elements
const videosGrid = document.querySelector('.videos-grid');
const categoryTabs = document.querySelectorAll('.category-tab');
const loadMoreBtn = document.getElementById('loadMore');
const videoModal = document.querySelector('.video-modal');
const closeModal = document.querySelector('.close-modal');
const ytPlayer = document.getElementById('ytplayer');

// Current state
let currentCategory = 'all';
let visibleVideos = 4;

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderVideos();
    setupEventListeners();
});

// Render videos
function renderVideos() {
    videosGrid.innerHTML = '';

    const filtered = currentCategory === 'all'
        ? videoData
        : videoData.filter(v => v.category === currentCategory);

    const videosToShow = filtered.slice(0, visibleVideos);

    if (!videosToShow.length) {
        videosGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">No videos found in this category</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    videosToShow.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.videoId = video.id;

        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumb}" alt="${video.title}">
                <div class="play-button"><i class="fas fa-play"></i></div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.desc}</p>
                <div class="video-meta">
                    <span><i class="far fa-clock"></i> ${video.duration}</span>
                    <span><i class="far fa-eye"></i> ${video.views} views</span>
                </div>
            </div>
        `;
        videosGrid.appendChild(card);
    });

    loadMoreBtn.style.display = visibleVideos >= filtered.length ? 'none' : 'block';
}

// Event listeners
function setupEventListeners() {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            visibleVideos = 4;
            renderVideos();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        visibleVideos += 4;
        renderVideos();
    });

    document.addEventListener('click', e => {
        const card = e.target.closest('.video-card, .featured-card');
        if (card && card.dataset.videoId) {
            openVideoModal(card.dataset.videoId);
        }
    });

    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', e => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Open video modal
function openVideoModal(videoId) {
    ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    ytPlayer.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
}


// Initialize the page
init();

// स्क्रीन पर एनिमेटेड कंटेंट दिखाने के लिए
const screen = document.querySelector('.screen');
setInterval(() => {
  screen.style.background = `linear-gradient(135deg, 
    hsl(${Math.random() * 360}, 80%, 60%), 
    hsl(${Math.random() * 360}, 80%, 60%))`;
}, 3000);
