document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('matriculaModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const form = document.getElementById('matriculaForm');

    openBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        if (validateForm()) {
            sendEmail();
        }
    }

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        return isValid;
    }

    function sendEmail() {
        const formData = new FormData(form);
        let body = '';
        for (let [key, value] of formData.entries()) {
            if (key !== 'fotoCedFrontal' && key !== 'fotoCedDetras' && key !== 'comprobantePago') {
                body += `${key}: ${value}\n`;
            }
        }

        Email.send({
            SecureToken: "YOUR_SMTP_SECURE_TOKEN", // Reemplaza esto con tu token seguro de SMTP
            To: 'destinatario@ejemplo.com', // Reemplaza con el correo del destinatario
            From: "tu-email@ejemplo.com", // Reemplaza con tu correo
            Subject: "Nueva Matrícula Rápida",
            Body: body
        }).then(
            message => {
                alert("Formulario enviado correctamente");
                modal.style.display = "none";
                form.reset();
            }
        );
    }
});