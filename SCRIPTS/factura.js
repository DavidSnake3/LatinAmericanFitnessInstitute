// factura.js

document.addEventListener('DOMContentLoaded', function() {
    const invoice = JSON.parse(localStorage.getItem('currentInvoice'));

    if (invoice) {
        // Populate invoice details
        document.getElementById('customerName').textContent = invoice.customerName;
        document.getElementById('customerEmail').textContent = invoice.customerEmail;
        document.getElementById('customerCountry').textContent = invoice.customerCountry;
        document.getElementById('invoiceNumber').textContent = invoice.invoiceNumber;
        document.getElementById('invoiceDate').textContent = invoice.invoiceDate;

        // Populate invoice items
        const invoiceItemsContainer = document.getElementById('invoiceItems');
        invoice.items.forEach(item => {
            const total = item.quantity * item.price;
            invoiceItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₡${item.price.toLocaleString()}</td>
                    <td>₡${total.toLocaleString()}</td>
                </tr>
            `;
        });

        // Display totals
        document.getElementById('subtotal').textContent = `₡${invoice.subtotal.toLocaleString()}`;
        document.getElementById('iva').textContent = `₡${invoice.iva.toLocaleString()}`;
        document.getElementById('matricula').textContent = `₡${invoice.matricula.toLocaleString()}`;
        document.getElementById('total').textContent = `₡${invoice.total.toLocaleString()}`;

        // Set up print functionality
        document.getElementById('printInvoice').addEventListener('click', function() {
            window.print();
        });

        // Set up PDF download functionality
        document.getElementById('downloadPDF').addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text('Factura', 105, 15, null, null, 'center');
            doc.text(`Cliente: ${invoice.customerName}`, 20, 30);
            doc.text(`Email: ${invoice.customerEmail}`, 20, 40);
            doc.text(`País: ${invoice.customerCountry}`, 20, 50);
            doc.text(`Número de Factura: ${invoice.invoiceNumber}`, 20, 60);
            doc.text(`Fecha: ${invoice.invoiceDate}`, 20, 70);

            // Add table headers
            doc.text('Producto', 20, 90);
            doc.text('Cantidad', 80, 90);
            doc.text('Precio', 120, 90);
            doc.text('Total', 160, 90);

            // Add table content
            let yPos = 100;
            invoice.items.forEach(item => {
                doc.text(item.name, 20, yPos);
                doc.text(item.quantity.toString(), 80, yPos);
                doc.text(`₡${item.price.toLocaleString()}`, 120, yPos);
                doc.text(`₡${(item.quantity * item.price).toLocaleString()}`, 160, yPos);
                yPos += 10;
            });

            // Add totals
            yPos += 10;
            doc.text(`Subtotal: ₡${invoice.subtotal.toLocaleString()}`, 120, yPos);
            yPos += 10;
            doc.text(`IVA (13%): ₡${invoice.iva.toLocaleString()}`, 120, yPos);
            yPos += 10;
            doc.text(`Matrícula: ₡${invoice.matricula.toLocaleString()}`, 120, yPos);
            yPos += 10;
            doc.text(`TOTAL: ₡${invoice.total.toLocaleString()}`, 120, yPos);

            doc.save('factura.pdf');
        });
    } else {
        // If no invoice data is found, display an error message
        document.querySelector('.invoice-container').innerHTML = '<h2>No se encontró información de la factura.</h2>';
    }
});