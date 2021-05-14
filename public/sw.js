//for caching whole website 

//service worker

const cacheName = "version 1.0";


//installing service worker(adding caches)
this.addEventListener('install', (e) => {

   //caching will not be done in install event
    // e.waitUntil(
    //     caches
    //     .open(cacheName)
    //     .then(cache => cache.addAll(cacheAsset))
        
    // ).then(() => this.skipWaiting);
    console.log('service worker installed');

})



//activation of service worker + deleting the old duplicate cache
this.addEventListener('activate', (e) => {
    console.log('service worker activated');

    e.waitUntil(
    caches.keys().then( //keys() returns all keys of object content as an array 
        cacheNames => {
            return Promise.all( //promise.all returns the an array of all the results of many promises inside it 
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        caches.delete(cache);
                        console.log("service worker deleting caches")

                    }}
                    )
            )
        }
    )
    )
})


// for offline app loading ability

this.addEventListener('fetch', e => {
    console.log("service worker : fetching")
    // e.respondWith(
    //     fetch(e.request).catch(()=> caches.match(e.request))

    // )

    //installing caches and enabling offline loading ability here in fetch event

    e.respondWith(
        fetch(e.request)
        .then(
            res => {
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(
                cache => cache.put(e.request, resClone)
            )
            return res;
            }).catch(err => caches.match(e.request).then(res=> res))
       
    )
})