// PWA setup and installation handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/scripts/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Handle PWA installation
let deferredPrompt;
const installButton = document.getElementById('install-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    if (installButton) {
        installButton.style.display = 'block';
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to install prompt: ${outcome}`);
                deferredPrompt = null;
                installButton.style.display = 'none';
            }
        });
    }
});

// Handle offline/online status
function updateOnlineStatus() {
    const status = navigator.onLine;
    document.body.classList.toggle('offline', !status);
    
    const statusBar = document.getElementById('connection-status');
    if (statusBar) {
        statusBar.textContent = status ? 'Online' : 'Offline';
        statusBar.className = status ? 'status-online' : 'status-offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Initial check
