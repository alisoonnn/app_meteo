// service-worker.js
var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
    '/index.html',
    '/dist/output.min.css',
    '/js/script.js',
    '/js/jquery-3.2.1.min.js',
    '/img/night.svg',
    '/img/jour.svg',
    '/img/icon.png',
    '/img/pluie.svg',
    '/img/nuage.svg',
];



self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});



self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});