const CACHE_NAME = 'mckeywa-offline-v1';
const urlsToCache = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/assets/logo/site-logo.png',
  '/assets/logo/site-logo-dark.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only cache GET requests for same origin
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return fetch(request);
  }

  // Check if request is in cache
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(request).then((networkResponse) => {
          // Cache successful responses
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});
