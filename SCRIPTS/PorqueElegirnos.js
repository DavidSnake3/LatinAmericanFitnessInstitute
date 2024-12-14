document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = track.querySelectorAll('.reason-card');
    
    // Duplicar las tarjetas para crear un efecto infinito
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Función para reiniciar la animación
    function resetAnimation() {
        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow
        track.style.animation = null;
    }

    // Evento para reiniciar la animación cuando termina
    track.addEventListener('animationiteration', resetAnimation);

    let startX;
    let scrollLeft;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.animationPlayState = 'running';
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.animationPlayState = 'running';
    });
});