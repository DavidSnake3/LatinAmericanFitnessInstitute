document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const socialIcons = document.querySelector('.social-icons');

    navbarToggler.addEventListener('click', function() {
        socialIcons.classList.toggle('d-flex');
        socialIcons.classList.toggle('d-none');
    });
});