// Elementos necesarios
const teamMembers = {
    "Lic. Max Acuña": {
        role: "CEO y director academico",
        desc: "Mi nombre es Max Acuña, cuento con gran experiencia sobre toda esta area....."
    },
    "Ana Ruth Picado": {
        role: "Profesora",
        desc: "Mi nombre es Ana Ruth Picado, una apasionada instructora de acondicionamiento físico con una dedicación especial hacia el entrenamiento integral para mujeres. Desde 2018, he tenido el privilegio de guiar a mujeres en su camino hacia una vida más saludable y equilibrada, combinando diferentes técnicas y enfoques para lograr resultados óptimos y sostenibles. Mi enfoque se basa en una comprensión profunda del cuerpo y su funcionamiento. Estoy certificada en evaluación, anatomía, fisiología y neurofisiología del suelo pélvico, lo que me permite diseñar programas de entrenamiento personalizados que consideran las necesidades únicas de cada mujer. Creo firmemente en la importancia de un enfoque holístico para el bienestar físico, que no solo incluye el entrenamiento de fuerza y resistencia, sino también la flexibilidad, la movilidad y la salud del suelo pélvico. Además, con mi experiencia como maestra de Ashtanga Yoga, una práctica que no solo fortalece el cuerpo sino que también nutre la mente y el espíritu. A través de está y distintas herramientas holísticas que he adquirido a través de mi experiencia, enseño a mis alumnas a encontrar un equilibrio interno, mejorar su flexibilidad y reducir el estrés, complementando perfectamente el entrenamiento físico más intenso. Mi objetivo es empoderar a las mujeres para que se sientan fuertes, seguras y en control de su salud y bienestar. A través de mis clases, sesiones personalizadas y talleres proporcionando las herramientas y el apoyo necesarios para que cada una de mis alumnas alcance sus metas de fitness y bienestar de una manera segura y efectiva. Estoy comprometida con la educación continua y la actualización de mis conocimientos para ofrecer siempre lo mejor a mis alumnas. Mi enfoque integrador y personalizado se adapta a mujeres de todas las edades y niveles de condición física, ayudando a descubrir su verdadero potencial y a vivir una vida más plena y saludable"
    },
    "Wendolyn Arrieta": {
        role: "Administradora",
        desc: "Mi nombre es Wendolyn Arrieta, llevo tiempo administrando en LAFIT y dispuesta a llevar esto a un segundo nivel..."
    },
    "Lic.Elizabeth Delgado": {
        role: "Nutricionista",
        desc: "Mi nombre es Elizabeth Delgado Montero, de profesión Nutricionista, una profesión la cual considero muy importante y necesaria para lograr el bienestar integral de las personas, siendo la alimentación unos de los pilares fundamentales para conseguir un óptimo desempeño diario, tanto en las tareas cotidianas, como en diferentes áreas del fitness. Soy una entusiasta por el deporte y el ejercicio lo vivo y practico a diario, y así poder transmitir por medio de mi experiencia los grandes beneficios que un estilo de vida saludable nos puede aportar. Lo mas significativo en el desempeño como nutricionista, desde hace mas de 10 años, podría decir que es lograr que las personas, tengan una sana relación con cada grupo de alimenticio, conozcan sus necesidades específicas y `puedan lograr un estilo de vida feliz y placentero.Creo firmemente que es necesario la salud física, mental y espiritual, para así lograr un equilibrio en nuestra vida."
    },
    "Tec.Alberto Castro": {
        role: "Atencion Sistematizada",
        desc: "Mi nombre es Alberto Castro, estoy sumamente comprometido con ayudar y demostrar altos conocimientos en el area fitnes...."
    }
};
// Al hacer clic en un miembro del equipo
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', () => {
        // Aplicar blur al contenido de la página
        pageContent.classList.add('blur-background');

        // Obtener el nombre del miembro
        const name = member.querySelector('.card-title').textContent;

        // Obtener la información del miembro del objeto
        const { role, desc } = teamMembers[name];
        const imgSrc = member.querySelector('img').src;

        // Rellenar la tarjeta expandida con la información
        expandedImg.src = imgSrc;
        expandedName.textContent = name;
        expandedRole.textContent = role;
        expandedDesc.textContent = desc;

        // Mostrar la tarjeta expandida con animación
        expandedCard.classList.add('active');
    });
});

// Cerrar tarjeta expandida al hacer clic en el botón de cierre
const closeCard = document.querySelector('.close-card');
closeCard.addEventListener('click', () => {
    // Ocultar la tarjeta expandida
    expandedCard.classList.remove('active'); // Desactivar el modal
    pageContent.classList.remove('blur-background'); // Quitar el blur
});