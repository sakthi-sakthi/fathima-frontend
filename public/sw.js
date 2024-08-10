let cacheData = "fathima-v3";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/0.chunk.js",
        "/static/js/main.chunk.js",
        "/static/js/1.chunk.js",
        "/index.html",
        "/assets/css/bootstrap.min.css",
        "/assets/css/style.css",
        "/assets/css/responsive.css",
        "/assets/js/jquery.min.js",
        "/assets/fonts/DINPro-Medium%20tr.ttf",
        "/assets/fonts/DINPro-Light%20tr.ttf",
        "/assets/fonts/DINPro-Bold%20tr.ttf",
        "/assets/fonts/DINPro-Black%20tr.ttf",
        "/assets/images/banner.png",
        "/images/logos/output-onlinegiftools.gif",
        "/assets/images/church.PNG",
        "/assets/images/img/donate.1.webp",
        "/assets/images/father.jpeg",
        "/assets/images/mom.png",
        "/assets/images/bgnew.jpg",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
