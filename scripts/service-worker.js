// Enhanced Service Worker with dynamic caching and offline support
const CACHE_NAME = 'ai-insights-v1';
const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/blog.html',
    '/styles/blog.css',
    '/styles/blog-enhanced.css',
    '/scripts/blog-search.js',
    '/scripts/blog-pagination.js',
    '/scripts/animations.js',
    '/images/download.jpeg',
    '/images/7d.jpg'
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch strategy: Cache first, then network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(response => {
                    // Cache new resources
                    if (response.ok && event.request.method === 'GET') {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    return response;
                });
            })
    );
});
