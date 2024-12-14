document.getElementById('matriculaForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío por defecto

    const fotoFrontal = document.getElementById('fotoCedFrontal').files[0];
    const fotoDetras = document.getElementById('fotoCedDetras').files[0];
    const comprobante = document.getElementById('comprobantePago').files[0];

    // Validar formatos de imagen y PDF
    if (fotoFrontal && !['image/png', 'image/jpeg'].includes(fotoFrontal.type)) {
        alert('La Foto Cédula Frontal debe ser JPG o PNG');
        return;
    }
    if (fotoDetras && !['image/png', 'image/jpeg'].includes(fotoDetras.type)) {
        alert('La Foto Cédula Detrás debe ser JPG o PNG');
        return;
    }
    if (comprobante && comprobante.type !== 'application/pdf') {
        alert('El Comprobante de Pago debe ser un archivo PDF');
        return;
    }

    // Si todo es válido, puedes proceder a enviar los datos (por correo o backend)
    alert('Matrícula enviada exitosamente');
});
document.querySelector('.floating-matricula-btn').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('matriculaModal'));
    modal.show();
});