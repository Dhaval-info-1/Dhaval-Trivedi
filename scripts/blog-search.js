// Enhanced blog search and analytics with debouncing and filters
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blog-search');
    const categoryFilter = document.getElementById('category-filter');
    const tagFilter = document.getElementById('tag-filter');
    const sortSelect = document.getElementById('sort-select');
    const postsContainer = document.querySelector('.posts-grid');
    const searchAnalytics = new Map();
    let allPosts = [];
    let searchTimeout;
    
    // Initialize Isotope for grid layout
    const iso = new Isotope(postsContainer, {
        itemSelector: '.blog-card',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s',
        stagger: 30,
        getSortData: {
            date: '[data-date]',
            title: '.blog-title',
            reads: '[data-reads] parseInt'
        }
    });

    // Fetch blog posts data
    fetch('/config/blog.yml')
        .then(response => response.text())
        .then(yaml => {
            allPosts = parseYAML(yaml).posts;
            renderPosts(allPosts);
            initializePagination(allPosts);
        });

    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        const filteredPosts = allPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                                post.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
            const matchesCategory = !selectedCategory || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderPosts(filteredPosts);
        initializePagination(filteredPosts);
    }, 300));

    // Category filter
    categoryFilter.addEventListener('change', () => {
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    });
});

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
