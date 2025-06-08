// Performance optimizations and analytics
document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Reading progress tracking
    const progressBar = document.querySelector('.reading-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Performance metrics tracking
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const paintMetrics = performance.getEntriesByType('paint');
            const navigationMetrics = performance.getEntriesByType('navigation');
            
            // Send metrics to analytics
            const metrics = {
                fcp: paintMetrics.find(p => p.name === 'first-contentful-paint')?.startTime,
                loadTime: navigationMetrics[0]?.loadEventEnd,
                domInteractive: navigationMetrics[0]?.domInteractive,
                url: window.location.href
            };

            // Log metrics (replace with your analytics service)
            console.log('Performance Metrics:', metrics);
        });
    }

    // Preload related articles
    const relatedLinks = document.querySelectorAll('.related-card');
    relatedLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'document';
            preloadLink.href = href;
            document.head.appendChild(preloadLink);
        }
    });
});
