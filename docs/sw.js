const CACHE_STATIC_NAME = 'static-v4';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', e => {
    // abre el cache y almacena los archivos
    const cacheProm = caches.open(CACHE_STATIC_NAME).then(cache => {
        return cache.addAll([
            '/', // se incluye este path para que funcione la aplicacion en modo offline cuando se accede solo con el nomrbre del dominio, ej: localhost:8080 o localhost:8080/
            './index.html',
            './assets/img/1.jpg',
            './assets/img/2.jpg',
            './assets/img/3.jpg',
        ]);
    });

    // espera que termine la promesa para avanzar al siguiente evento
    e.waitUntil(Promise.all([cacheProm]));
});

self.addEventListener('activate', event => {
    // event.waitUntil(
    //     caches.keys().then(cacheNames => {
    //         return Promise.all(
    //             cacheNames.filter(cacheName => {
    //                 return cacheName.startsWith('static-') && cacheName != CACHE_STATIC_NAME;
    //             }).map(cacheName => {
    //                 return caches.delete(cacheName);
    //             })
    //         );
    //     })
    // )
});

self.addEventListener('fetch', e => {
    // -- 2.- CACHE WITH NETWORK FALLBACK: Primero revisa el cache y luego internet si es que no encuentra el recurso
    // verifica si el archivo existe en el cache
    const respuesta = caches.match(e.request).then(res => {
        // si existe lo retorna
        if (res) return res;

        // si no existe lo busca en internet
        console.log('No existe', e.request.url);
        // retorna la peticion desde la web
        return fetch(e.request).then(newResp => {
            // graba en cache el archivo para que no vuelva a obtenerlo desde internet
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                cache.put(e.request, newResp);
            });
            
            // retorna la peticion
            return newResp.clone();
        });
    });
    e.respondWith(respuesta);
});