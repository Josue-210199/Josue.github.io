self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('jb-sig-studio-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './puntos.js',
        'https://unpkg.com/leaflet/dist/leaflet.css',
        'https://unpkg.com/leaflet/dist/leaflet.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
