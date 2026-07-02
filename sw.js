const CACHE = 'ritmo-unificado-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first para los archivos locales: con conexión siempre sirve la última
// versión y refresca la caché; sin conexión recurre a la caché (soporte offline).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // Supabase, fuentes, CDN: a la red

  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() =>
      caches.match(e.request).then(cached =>
        cached || caches.match('./index.html')
      )
    )
  );
});

// Permite forzar la activación inmediata desde la página.
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
