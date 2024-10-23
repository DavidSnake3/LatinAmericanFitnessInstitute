document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.getElementById('blogGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterBtns = document.querySelectorAll('[data-filter]');
    const blogItems = document.querySelectorAll('.blog-item');

    function showCards() {
        blogItems.forEach((item, index) => {
            setTimeout(() => {
                item.querySelector('.blog-card').classList.add('show');
            }, index * 100);
        });
    }

    showCards();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            blogItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            blogItems.forEach(item => item.querySelector('.blog-card').classList.remove('show'));
            setTimeout(showCards, 100);
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';

        setTimeout(() => {

            const newArticles = [
                {title: "Yoga para deportistas", category: "fitness", date: "15 de marzo, 2023"},
                {title: "Dietas cetogénicas y rendimiento", category: "nutricion", date: "5 de marzo, 2023"},
                {title: "Realidad virtual en el gimnasio", category: "tecnologia", date: "1 de marzo, 2023"}
            ];

            newArticles.forEach(article => {
                const newItem = document.createElement('div');
                newItem.className = 'col-md-4 mb-4 blog-item';
                newItem.setAttribute('data-category', article.category);
                newItem.innerHTML = `
                    <div class="card h-100 feature-card blog-card">
                        <img src="/placeholder.svg?height=200&width=400" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title neon-text">${article.title}</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <a href="#" class="btn btn-primary neon-text">Leer más</a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Publicado el ${article.date}</small>
                        </div>
                    </div>
                `;
                blogGrid.appendChild(newItem);
            });

            showCards();
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = 'Cargar más artículos';
        }, 1500);
    });
});