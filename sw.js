const CACHE = 'tinder-p2p-v4';
const FILES = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    // Réseau en priorité pour les requêtes Gun (WebSocket/API), cache en fallback pour le reste
    const url = new URL(e.request.url);
    if (url.protocol === 'wss:' || url.hostname.includes('herokuapp.com')) {
        return; // laisser passer sans interception
    }
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});