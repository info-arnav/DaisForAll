self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("Infinity").then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      const cache = await caches.open("Infinity");
      const cachedResponse = await cache.match(event.request);
      const networkResponsePromise = fetch(event.request);

      event.waitUntil(
        (async function () {
          const networkResponse = await networkResponsePromise;
          await cache.put(event.request, networkResponse.clone());
        })()
      );

      // Returned the cached response if we have one, otherwise return the network response.
      return cachedResponse || networkResponsePromise;
    })()
  );
});
