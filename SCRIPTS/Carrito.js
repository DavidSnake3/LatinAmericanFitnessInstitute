document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], type: null };
    const featureList = document.getElementById('featureList');
    const cartItems = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const ivaEl = document.getElementById('iva');
    const totalEl = document.getElementById('total');
    const cartItemCount = document.getElementById('cartItemCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Load features
    fetch('features.json')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <span>${feature.name} - ₡${feature.price.toLocaleString()}</span>
                    <button class="btn btn-sm btn-outline-primary add-feature" data-id="${feature.id}" data-name="${feature.name}" data-price="${feature.price}">Agregar</button>
                `;
                featureList.appendChild(featureItem);
            });

            // Add event listeners to feature buttons
            document.querySelectorAll('.add-feature').forEach(button => {
                button.addEventListener('click', addFeature);
            });
        });

    function addFeature(event) {
        const feature = event.target.dataset;
        if (cart.type === 'plan') {
            alert('No se pueden agregar características individuales cuando ya se ha seleccionado un plan.');
            return;
        }
        cart.type = 'custom';
        const existingItem = cart.items.find(item => item.id === feature.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.items.push({
                id: feature.id,
                name: feature.name,
                price: parseInt(feature.price),
                quantity: 1
            });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let subtotal = 0;
        cart.items.forEach((item, index) => {
            const total = item.price * item.quantity;
            subtotal += total;
            cartItems.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>Característica individual</td>
                    
                    <td>₡${item.price.toLocaleString()}</td>
                    <td>
                        <div class="input-group quantity-control">
                            <button class="btn btn-outline-light" onclick="updateQuantity(${index}, -1)">-</button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-light" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </td>
                    <td>₡${total.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        const iva = subtotal * 0.13;
        const matricula = 25000;
        const total = subtotal + iva + matricula;

        subtotalEl.textContent = `₡${subtotal.toLocaleString()}`;
        ivaEl.textContent = `₡${iva.toLocaleString()}`;
        totalEl.textContent = `₡${total.toLocaleString()}`;
        cartItemCount.textContent = cart.items.length;

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.updateQuantity = function(index, change) {
        cart.items[index].quantity = Math.max(1, cart.items[index].quantity + change);
        updateCart();
    };

    window.removeItem = function(index) {
        cart.items.splice(index, 1);
        if (cart.items.length === 0) {
            cart.type = null;
        }
        updateCart();
    };

    checkoutBtn.addEventListener('click', function() {
        alert('Gracias por tu compra. Serás redirigido al proceso de pago.');
        // Here you would typically redirect to a payment processing page
    });

    // Initial cart update
    updateCart();
});