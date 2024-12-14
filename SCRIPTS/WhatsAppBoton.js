document.addEventListener('DOMContentLoaded', function () {
    const openWhatsApp = document.getElementById('openWhatsApp');
    const openChatbot = document.getElementById('openChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbot = document.getElementById('chatbot');

    // Mostrar/ocultar botón de WhatsApp al abrir/cerrar el chatbot
    openChatbot.addEventListener('click', () => {
        chatbot.style.display = 'flex'; // Mostrar el chatbot
        openWhatsApp.classList.add('hidden'); // Ocultar botón de WhatsApp
    });

    closeChatbot.addEventListener('click', () => {
        chatbot.style.display = 'none'; // Ocultar el chatbot
        openWhatsApp.classList.remove('hidden'); // Mostrar botón de WhatsApp
    });
});