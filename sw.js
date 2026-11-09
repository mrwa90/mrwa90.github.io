const CACHE = 'reisebuechlein-v6';
const FILES = ['./', './index.html', './style.css', './style2.css', './app.js', './data.js', './credits.js', './info.js',
  './anreise.js', './sprache-wien.js', './sprache-el.js', './sprache-es.js', './sprache-ca.js',
  './leaflet/leaflet.js', './leaflet/leaflet.css',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './images/1.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg', './images/9.jpg', './images/10.jpg', './images/11.jpg', './images/12.jpg', './images/13.jpg', './images/14.jpg', './images/15.jpg', './images/16.jpg', './images/17.jpg', './images/18.jpg', './images/19.jpg', './images/20.jpg', './images/21.jpg', './images/22.jpg', './images/23.jpg', './images/24.jpg', './images/25.jpg', './images/26.jpg', './images/27.jpg', './images/28.jpg', './images/29.jpg', './images/30.jpg', './images/31.jpg', './images/32.jpg', './images/33.jpg', './images/34.jpg', './images/35.jpg', './images/37.jpg', './images/38.jpg', './images/39.jpg', './images/40.jpg', './images/41.jpg', './images/42.jpg', './images/43.jpg', './images/44.jpg', './images/45.jpg', './images/46.jpg', './images/47.jpg', './images/48.jpg', './images/49.jpg', './images/50.jpg', './images/51.jpg', './images/52.jpg', './images/53.jpg', './images/54.jpg', './images/55.jpg', './images/56.jpg', './images/57.jpg', './images/58.jpg', './images/59.jpg', './images/61.jpg', './images/62.jpg', './images/63.jpg', './images/64.jpg', './images/65.jpg', './images/66.jpg', './images/67.jpg', './images/68.jpg', './images/69.jpg', './images/70.jpg', './images/71.jpg', './images/72.jpg', './images/73.jpg', './images/74.jpg', './images/75.jpg', './images/76.jpg', './images/77.jpg', './images/78.jpg', './images/79.jpg', './images/80.jpg', './images/81.jpg', './images/82.jpg', './images/83.jpg', './images/84.jpg', './images/85.jpg', './images/86.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Nur eigene App-Dateien cachen – OSM-Kartenkacheln und externe Seiten nicht dauerhaft speichern
  if (new URL(e.request.url).origin !== self.location.origin) return;
  const url = new URL(e.request.url);
  const isCode = e.request.mode === 'navigate' || /\.(html|js|css|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (isCode) {
    // App-Code: online zuerst frisch laden (max. 3 s), sonst aus dem Speicher – so kommen Updates sofort an
    e.respondWith(new Promise(resolve => {
      let done = false;
      const fromCache = () => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html'));
      const timer = setTimeout(() => { if (!done) fromCache().then(r => { if (r && !done) { done = true; resolve(r); } }); }, 3000);
      fetch(e.request).then(r => {
        if (r && r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        if (!done) { done = true; clearTimeout(timer); resolve(r); }
      }).catch(() => fromCache().then(r => { if (!done) { done = true; clearTimeout(timer); resolve(r); } }));
    }));
    return;
  }
  // Bilder & Leaflet-Dateien: aus dem Speicher (offline), sonst laden und merken
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match('./index.html')))
  );
});
