document.addEventListener('DOMContentLoaded', () => {

    // === DYNAMIC ISLAND HEADER LOGIC ===
    const island = document.getElementById('dynamic-island');
    const islandTrigger = document.getElementById('island-trigger');

    islandTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (island.classList.contains('island-collapsed')) {
            island.classList.remove('island-collapsed');
            island.classList.add('island-expanded');
        } else {
            island.classList.remove('island-expanded');
            island.classList.add('island-collapsed');
        }
    });

    // Close island when clicking navigation links
    const navLinks = document.querySelectorAll('.island-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            island.classList.remove('island-expanded');
            island.classList.add('island-collapsed');
        });
    });

    // Close island when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!island.contains(e.target)) {
            island.classList.remove('island-expanded');
            island.classList.add('island-collapsed');
        }
    });


    // === ANIMATED VERTICAL BAR LOGIC ===
    const words = ["CREATIVE", "BCA GRADUATE", "FREELANCE", "DEVELOPER"];
    const slidingTitle = document.getElementById('sliding-title');
    let currentIndex = 0;

    function rotateWords() {
        // Step 1: Slide back into the bar (hide)
        slidingTitle.classList.remove('visible');
        
        setTimeout(() => {
            // Step 2: Switch text
            currentIndex = (currentIndex + 1) % words.length;
            slidingTitle.textContent = words[currentIndex];
            
            // Step 3: Slide out of the bar (show)
            slidingTitle.classList.add('visible');
        }, 600); // matches the CSS transition length
    }

    // Initialize first word immediately
    slidingTitle.textContent = words[0];
    setTimeout(() => {
        slidingTitle.classList.add('visible');
    }, 100);

    // Repeat rotation every 3.2 seconds
    setInterval(rotateWords, 3200);

});

// === ABOUT PROFILE CIRCLE MODAL LOGIC ===
const circleOverlay = document.getElementById('profile-overlay');

function openProfile(e) {
    if (e) e.preventDefault();
    circleOverlay.classList.add('active');
    
    // Collapse dynamic island if open
    const island = document.getElementById('dynamic-island');
    island.classList.remove('island-expanded');
    island.classList.add('island-collapsed');
}

function closeProfile() {
    circleOverlay.classList.remove('active');
}

// Close modal when clicking outside of the circle content
circleOverlay.addEventListener('click', (e) => {
    if (e.target === circleOverlay) {
        closeProfile();
    }
});


// === SLIDESHOW CONTROLS ===
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function changeSlide(direction) {
    // Hide active elements
    slides[currentSlideIndex].classList.remove('active-slide');
    dots[currentSlideIndex].classList.remove('active-dot');

    // Update index with wrap-around
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Show new active elements
    slides[currentSlideIndex].classList.add('active-slide');
    dots[currentSlideIndex].classList.add('active-dot');
}
