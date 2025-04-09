self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("crypto-cache").then((cache) => {
        return cache.addAll([
          "./",
          "./index.html",
          "./styles.css",
          "./script.js",
          "./chart.js",
          "./assets/icons/favicon.png"
        ]);
      })
    );
  });
  
  // Desactiva el service worker temporalmente
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
  