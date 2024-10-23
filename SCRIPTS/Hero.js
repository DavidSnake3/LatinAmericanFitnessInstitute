
 const phrases = [
    "Construye tu futuro fitness",
    "Desbloquea tu potencial tecnológico",
    "Aprende técnicas de vanguardia",
    "Transforma tu vida con LAFIT"
];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
const typingText = document.getElementById('typing-text');

function typeText() {
    if (currentCharIndex < phrases[currentPhraseIndex].length) {
        typingText.textContent += phrases[currentPhraseIndex][currentCharIndex];
        currentCharIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (typingText.textContent.length > 0) {
        typingText.textContent = typingText.textContent.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        currentCharIndex = 0;
        setTimeout(typeText, 500);
    }
}

typeText();



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


var heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
    interval: 3000,
    pause: false
});