document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        item.addEventListener('show.bs.collapse', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('hide.bs.collapse', function() {
            this.classList.remove('active');
        });
    });
});