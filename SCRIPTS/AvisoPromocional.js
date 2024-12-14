document.addEventListener('DOMContentLoaded', function() {
    const promoBar = document.getElementById('promoBar');
    const closeButton = document.getElementById('closePromo');
    const countdownElement = document.getElementById('countdown');

    // Función para cerrar el aviso
    function closePromo() {
        promoBar.style.display = 'none';
    }

    // Configurar el contador
    const endDate = new Date().getTime() + 15 * 24 * 60 * 60 * 1000; // 15 días desde ahora

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "¡La oferta ha terminado!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Evento para cerrar el aviso
    closeButton.addEventListener('click', closePromo);
});
