// Client-side routing and state management
class BlogRouter {
    constructor() {
        this.routes = new Map();
        this.currentState = {
            page: 1,
            category: null,
            search: '',
            tag: null,
            sort: 'date'
        };

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.setState(e.state, false);
                this.loadContent();
            }
        });
    }

    addRoute(path, callback) {
        this.routes.set(path, callback);
    }

    async navigateTo(path, state = {}) {
        // Update URL and state
        window.history.pushState(
            state,
            '',
            `${window.location.origin}${path}`
        );
        this.setState(state);
        await this.loadContent();
    }

    setState(newState, pushState = true) {
        this.currentState = { ...this.currentState, ...newState };
        if (pushState) {
            window.history.pushState(
                this.currentState,
                '',
                this.getUrlFromState()
            );
        }
    }

    getUrlFromState() {
        const params = new URLSearchParams();
        if (this.currentState.page > 1) {
            params.set('page', this.currentState.page);
        }
        if (this.currentState.category) {
            params.set('category', this.currentState.category);
        }
        if (this.currentState.search) {
            params.set('search', this.currentState.search);
        }
        if (this.currentState.tag) {
            params.set('tag', this.currentState.tag);
        }
        if (this.currentState.sort !== 'date') {
            params.set('sort', this.currentState.sort);
        }

        const query = params.toString();
        return `/blog${query ? '?' + query : ''}`;
    }

    async loadContent() {
        try {
            const response = await fetch(`/api/posts?${new URLSearchParams(this.currentState)}`);
            const data = await response.json();
            this.updateUI(data);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    updateUI(data) {
        const postsContainer = document.querySelector('.posts-grid');
        const paginationContainer = document.querySelector('.pagination');
        
        // Update posts
        postsContainer.innerHTML = data.posts.map(post => this.renderPostCard(post)).join('');
        
        // Update pagination
        this.updatePagination(data.page, data.pages);
        
        // Update active filters
        this.updateActiveFilters();
        
        // Animate new content
        this.animateContent();
    }

    renderPostCard(post) {
        return `
            <article class="blog-card" data-category="${post.category}">
                <img 
                    class="blog-card-image" 
                    src="${post.image}" 
                    alt="${post.title}"
                    loading="lazy"
                >
                <div class="blog-card-content">
                    <h2 class="blog-title">${post.title}</h2>
                    <p>${post.description}</p>
                    <div class="blog-meta">
                        <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                        <span class="read-time">${post.readTime} min read</span>
                    </div>
                    <div class="tags">
                        ${post.tags.map(tag => `
                            <span class="tag" data-tag="${tag}">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    updatePagination(currentPage, totalPages) {
        const pagination = document.querySelector('.pagination');
        let html = '';

        if (totalPages > 1) {
            html += `
                <button 
                    class="pagination-button prev" 
                    ${currentPage === 1 ? 'disabled' : ''}
                    onclick="router.navigateTo('/blog', { page: ${currentPage - 1} })"
                >Previous</button>
            `;

            for (let i = 1; i <= totalPages; i++) {
                html += `
                    <button 
                        class="pagination-button ${i === currentPage ? 'active' : ''}"
                        onclick="router.navigateTo('/blog', { page: ${i} })"
                    >${i}</button>
                `;
            }

            html += `
                <button 
                    class="pagination-button next"
                    ${currentPage === totalPages ? 'disabled' : ''}
                    onclick="router.navigateTo('/blog', { page: ${currentPage + 1} })"
                >Next</button>
            `;
        }

        pagination.innerHTML = html;
    }

    updateActiveFilters() {
        // Update category filter
        const categoryButtons = document.querySelectorAll('.category-filter');
        categoryButtons.forEach(button => {
            button.classList.toggle('active', 
                button.dataset.category === this.currentState.category);
        });

        // Update tag filters
        const tagButtons = document.querySelectorAll('.tag-filter');
        tagButtons.forEach(button => {
            button.classList.toggle('active', 
                button.dataset.tag === this.currentState.tag);
        });

        // Update sort selection
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = this.currentState.sort;
        }
    }

    animateContent() {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    }
}

// Initialize router
const router = new BlogRouter();

// Set up routes
document.addEventListener('DOMContentLoaded', () => {
    // Initialize from current URL
    const params = new URLSearchParams(window.location.search);
    router.setState({
        page: parseInt(params.get('page')) || 1,
        category: params.get('category'),
        search: params.get('search'),
        tag: params.get('tag'),
        sort: params.get('sort') || 'date'
    }, false);

    router.loadContent();
});
