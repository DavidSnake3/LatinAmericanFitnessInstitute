// payment.js

document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const payButton = document.getElementById('payButton');
    const paymentForm = document.getElementById('paymentForm');
    const spinner = payButton.querySelector('.spinner-border');

    payButton.addEventListener('click', function() {
        if (paymentForm.checkValidity()) {
            processPayment();
        } else {
            paymentForm.reportValidity();
        }
    });

    function processPayment() {
        // Show loading spinner
        spinner.style.display = 'inline-block';
        payButton.disabled = true;

        // Simulate payment processing
        setTimeout(function() {
            // Hide loading spinner
            spinner.style.display = 'none';
            payButton.disabled = false;

            // Close the modal
            paymentModal.hide();

            // Generate invoice
            generateInvoice();

            // Clear the cart
            localStorage.removeItem('cart');

            // Show success message
            alert('Gracias por tu compra. Se ha enviado la factura a tu correo electrónico.');

            // Redirect to invoice page
            window.location.href = 'factura.html';
        }, 3000); // Simulating a 3-second payment process
    }

    function generateInvoice() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const customerName = document.getElementById('name').value;
        const customerEmail = document.getElementById('email').value;
        const customerCountry = document.getElementById('country').value;

        const invoice = {
            customerName: customerName,
            customerEmail: customerEmail,
            customerCountry: customerCountry,
            invoiceNumber: 'INV-' + Date.now(),
            invoiceDate: new Date().toLocaleDateString(),
            items: cart.items,
            subtotal: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
            iva: cart.items.reduce((total, item) => total + item.price * item.quantity, 0) * 0.13,
            matricula: 25000
        };

        invoice.total = invoice.subtotal + invoice.iva + invoice.matricula;

        // Store the invoice in localStorage for the invoice page to use
        localStorage.setItem('currentInvoice', JSON.stringify(invoice));
    }

    // Add input validation for card number (numbers only)
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Add input validation for expiration date (MM/YY format)
    const expirationDateInput = document.getElementById('expirationDate');
    expirationDateInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9/]/g, '');
        if (this.value.length === 2 && !this.value.includes('/')) {
            this.value += '/';
        }
    });

    // Add input validation for CVV (numbers only)
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});