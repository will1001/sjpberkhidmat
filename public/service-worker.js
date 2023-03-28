const cacheName = 'sjp-cache'
const filesToCache = [
  '/',
  '/offline',
  '/static/*',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }

        const fetchRequest = event.request.clone()

        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200) {
              return response
            }

            const responseToCache = response.clone()

            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
      })
      .catch(() => {
        return caches.match('/offline')
      })
  )
})
