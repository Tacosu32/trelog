const CACHE_NAME = "trelog-cache-v0.5.0-dev-continuity-calendar-2026-06-09";

const CORE_ASSETS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

const OPTIONAL_ASSETS = [
  "./assets/icons/icon.svg",
  "./assets/trainer/public/trainer_default.png",
  "./assets/trainer/public/trainer_cheer.png",
  "./assets/trainer/public/trainer_result.png",
  "./assets/trainer/public/trainer_rest.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const cacheCoreAssets = cache.addAll(CORE_ASSETS);
      const cacheOptionalAssets = Promise.all(
        OPTIONAL_ASSETS.map((asset) => {
          return cache.add(asset).catch(() => null);
        })
      );

      return Promise.all([cacheCoreAssets, cacheOptionalAssets]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
