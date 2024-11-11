document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the packages data
        const response = await fetch('JSON/PaquetesPromociones.json');
        const data = await response.json();
        
        // Get the container and template
        const container = document.getElementById('pricingContainer');
        const template = document.getElementById('package-template');
        
        // Render each package
        data.packages.forEach(package => {
            // Clone the template
            const card = template.content.cloneNode(true);
            
            // Fill in the package details
            card.querySelector('.package-name').textContent = package.name;
            card.querySelector('.price').textContent = package.price;
            card.querySelector('.period').textContent = package.period;
            card.querySelector('.description').textContent = package.description;
            
            // Add features
            const featuresList = card.querySelector('.features-list');
            package.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Set the package name as a data attribute on the select button
            card.querySelector('.select-package').dataset.packageName = package.name;
            
            // Add the card to the container
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading packages:', error);
        document.getElementById('pricingContainer').innerHTML = `
            <div class="error-message">
                Lo sentimos, no se pudieron cargar los paquetes. Por favor, intente más tarde.
            </div>
        `;
    }
});