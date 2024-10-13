 // Timeline animation
 function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timeline = document.querySelector('.timeline');
    const scrollPosition = window.scrollY;
    const timelineTop = timeline.offsetTop;
    const timelineHeight = timeline.offsetHeight;
    
    // Calculate progress based on scroll position
    let progress = (scrollPosition - timelineTop + window.innerHeight) / (timelineHeight + window.innerHeight);
    progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
    
    timelineProgress.style.transform = `scaleY(${progress})`;
    timelineProgress.style.background = `linear-gradient(to bottom, #6c3ce9 ${progress * 150}%, #1a1332 ${progress * 150}%)`;

    timelineItems.forEach((item) => {
        if (isElementInViewport(item)) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);