window.addEventListener('load', function() {
    document.getElementById('loader').style.display = 'none';
    
    const animatedElements = document.querySelectorAll('.animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

window.addEventListener('scroll', function() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        const scrollPosition = window.pageYOffset;
        bg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});