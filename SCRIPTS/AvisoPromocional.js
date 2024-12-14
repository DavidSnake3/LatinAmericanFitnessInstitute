document.addEventListener('DOMContentLoaded', function() {
    const promoBar = document.getElementById('promoBar');
    const closeButton = document.getElementById('closePromo');
    const navbar = document.querySelector('nav'); // Obtener el navbar

    // Si no hay fecha guardada en el localStorage, establece la fecha objetivo a 15 días desde ahora
    let endDate = localStorage.getItem('endDate');
    if (!endDate) {
        endDate = new Date();
        endDate.setDate(endDate.getDate() + 15); // Establecer 15 días desde ahora
        localStorage.setItem('endDate', endDate); // Guardar la fecha en el localStorage
    } else {
        endDate = new Date(endDate); // Convertir el valor guardado a un objeto Date
    }

    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            promoBar.style.display = 'none';
            navbar.classList.remove('promo-active'); // Restaurar la posición original del navbar
        }
    }

    // Actualizar el contador cada segundo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Función para cerrar el aviso y mover el navbar
    function closePromo() {
        promoBar.style.display = 'none';
        navbar.classList.remove('promo-active'); // Restaurar la posición original del navbar
    }

    // Evento para cerrar el aviso
    closeButton.addEventListener('click', closePromo);

    // Mostrar el aviso nuevamente al recargar la página
    window.addEventListener('load', function() {
        promoBar.style.display = 'flex';
        navbar.classList.add('promo-active'); // Mover el navbar hacia abajo cuando el aviso esté visible
    });
});
