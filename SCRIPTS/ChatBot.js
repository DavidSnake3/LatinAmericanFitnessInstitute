document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const openChatbotBtn = document.getElementById('openChatbot');
    const closeChatbotBtn = document.getElementById('closeChatbot');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage');

    const botResponses = {
        "hola": "¡Hola! Bienvenido a LAFIT. ¿En qué puedo ayudarte hoy?",
        "cursos": "Ofrecemos un Técnico en Acondicionamiento Físico que consta de 4 módulos. Visita nuestra seccion de cursos",
        "horarios": "Nuestros cursos tienen horarios flexibles. Por favor, contáctanos directamente para más detalles sobre los horarios disponibles.",
        "precio": "El precio de nuestros cursos varía según el programa. Te recomiendo contactar a nuestro equipo de ventas para obtener información detallada y actualizada.",
        "ubicacion": "Estamos ubicados en Costa Rica,Alajuela el centro de San Ramón.",
        "inscripcion": "Para inscribirte, puedes contactarte mediante la plataforma de WhatsApp o otras de nuestras redes sociales.",
        "default": "Lo siento, no tengo información sobre eso, estoy programado para preguntas especificas de LAFIT. ¿Puedo ayudarte con algo más o prefieres hablar con un representante?"
    };

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        for (const [key, value] of Object.entries(botResponses)) {
            if (userMessage.includes(key)) {
                return value;
            }
        }
        return botResponses.default;
    }

    openChatbotBtn.addEventListener('click', () => {
        chatbot.style.display = 'flex';
        openChatbotBtn.style.display = 'none';
    });

    closeChatbotBtn.addEventListener('click', () => {
        chatbot.style.display = 'none';
        openChatbotBtn.style.display = 'flex';
    });

    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 500);
        }
    }

    // Mensaje de bienvenida
    setTimeout(() => {
        addMessage("¡Hola! Soy el asistente virtual de LAFIT. ¿En qué puedo ayudarte hoy?");
    }, 1000);
});