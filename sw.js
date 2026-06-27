// Service Worker - Cache pour fonctionnement hors-ligne
const CACHE = 'tinder-p2p-v1';
const FILES = ['/tinder-p2p-pwa/', '/tinder-p2p-pwa/index.html', '/tinder-p2p-pwa/manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
