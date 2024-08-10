let cacheData = "fathima-v1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/static/js/0.chunk.js",
        "/static/js/main.chunk.js",
        "/static/js/1.chunk.js",
        "/index.html",
        "/",
        "/assets/css/bootstrap.min.css",
        "/assets/css/owl.carousel.min.css",
        "/assets/css/owl.theme.default.min.css",
        "/assets/css/magnific-popup.css",
        "/assets/css/flaticon.css",
        "/assets/css/remixicon.css",
        "/assets/css/odometer.min.css",
        "/assets/css/meanmenu.min.css",
        "/assets/css/aos.css",
        "/assets/css/style.css",
        "/assets/css/dark.css",
        "/assets/css/responsive.css",
        "/assets/js/jquery.min.js",
        "/assets/js/bootstrap.bundle.min.js",
        "/assets/js/jquery.meanmenu.js",
        "/assets/js/owl.carousel.min.js",
        "/assets/js/carousel-thumbs.min.js",
        "/assets/js/jquery.magnific-popup.js",
        "/assets/js/aos.js",
        "/assets/js/odometer.min.js",
        "/assets/js/appear.min.js",
        "/assets/js/form-validator.min.js",
        "/assets/js/contact-form-script.js",
        "/assets/js/ajaxchimp.min.js",
        "/assets/js/custom.js",
        "/assets/fonts/remixicon972e.woff2?t=1681573354175",
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
        "https://s11.flagcounter.com/more/4jL0",
        "https://cms.fathimashrine.com/api/get/homepagee/sections",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || new Response("Network error occurred", {
          status: 408,
          statusText: "Network error",
        });
      });
    })
  );
});
