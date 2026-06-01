const CACHE_NAME = "trelog-alpha-v10";

const CORE_ASSETS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

const OPTIONAL_ASSETS = [
  "./assets/icons/icon.svg"
];

self.addEventListener("install", (event) => {
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
    })
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
