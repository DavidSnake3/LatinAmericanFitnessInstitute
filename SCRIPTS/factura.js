document.addEventListener('DOMContentLoaded', function () {
    const invoice = JSON.parse(localStorage.getItem('currentInvoice'));

    if (invoice) {
        // Poblar datos en el HTML
        document.getElementById('customerName').textContent = invoice.customerName;
        document.getElementById('customerEmail').textContent = invoice.customerEmail;
        document.getElementById('customerCountry').textContent = invoice.customerCountry;
        document.getElementById('invoiceNumber').textContent = invoice.invoiceNumber;
        document.getElementById('invoiceDate').textContent = invoice.invoiceDate;

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

        document.getElementById('subtotal').textContent = `₡${invoice.subtotal.toLocaleString()}`;
        document.getElementById('iva').textContent = `₡${invoice.iva.toLocaleString()}`;
        document.getElementById('matricula').textContent = `₡${invoice.matricula.toLocaleString()}`;
        document.getElementById('total').textContent = `₡${invoice.total.toLocaleString()}`;

        // Descargar PDF
        document.getElementById('downloadPDF').addEventListener('click', function () {
            const docDefinition = {
                content: [
                    { text: 'Factura', style: 'header', alignment: 'center' },
                    { text: `Cliente: ${invoice.customerName}`, style: 'subheader' },
                    `Email: ${invoice.customerEmail}`,
                    `País: ${invoice.customerCountry}`,
                    `Número de Factura: ${invoice.invoiceNumber}`,
                    `Fecha: ${invoice.invoiceDate}`,
                    { text: '\nDetalle de Productos:', style: 'subheader' },
                    {
                        table: {
                            widths: ['*', 'auto', 'auto', 'auto'],
                            body: [
                                ['Producto', 'Cantidad', 'Precio Unitario', 'Total'],
                                ...invoice.items.map(item => [
                                    item.name,
                                    item.quantity,
                                    `CRC ${item.price.toLocaleString()}`,
                                    `CRC ${(item.quantity * item.price).toLocaleString()}`
                                ]),
                            ]
                        }
                    },
                    '\n',
                    { text: `Subtotal: CRC ${invoice.subtotal.toLocaleString()}`, alignment: 'right' },
                    { text: `IVA (13%): CRC ${invoice.iva.toLocaleString()}`, alignment: 'right' },
                    { text: `Matrícula: CRC ${invoice.matricula.toLocaleString()}`, alignment: 'right' },
                    { text: `TOTAL: CRC ${invoice.total.toLocaleString()}`, style: 'total', alignment: 'right' }
                ],
                styles: {
                    header: { fontSize: 18, bold: true },
                    subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
                    total: { fontSize: 12, bold: true, margin: [0, 5, 0, 0] }
                }
            };

            pdfMake.createPdf(docDefinition).download('factura.pdf');
        });
    } else {
        document.querySelector('.invoice-container').innerHTML = '<h2>No se encontró información de la factura.</h2>';
    }
});
