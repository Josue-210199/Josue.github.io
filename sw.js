const CACHE_NAME = "jb-sig-mapa-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./puntos.js",
        "https://unpkg.com/leaflet/dist/leaflet.js",
        "https://unpkg.com/leaflet/dist/leaflet.css"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, lo usa; si no, lo descarga y guarda
      return (
        response ||
        fetch(event.request)
          .then((fetchRes) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchRes.clone());
              return fetchRes;
            });
          })
          .catch(() => caches.match("./index.html"))
      );
    })
  );
});
