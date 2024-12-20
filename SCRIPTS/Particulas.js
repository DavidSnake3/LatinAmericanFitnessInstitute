particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#00ffff" },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: {
    enable: true,
    speed: 2, 
    direction: "top", 
    random: false,
    straight: false,
    out_mode: "bounce", 
    bounce: true
    }
},
interactivity: {
    detect_on: "canvas",
    events: {
    onhover: { enable: false },
    onclick: { enable: false },
    resize: true
    }
},
retina_detect: true
});