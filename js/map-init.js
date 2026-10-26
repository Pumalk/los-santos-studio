/* ==========================================================================
   map-init.js — Инициализация виджета 2ГИС (ТЗ 5.4)
   Los Santos Studio
   Карта подключается через CDN-виджет 2ГИС (iframe).
   См. документацию: https://dev.2gis.com/widget/
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var mapContainer = document.getElementById('map-widget');
  if (!mapContainer) return;

  var mapOptions = {
    pos: { lat: 51.816071, lon: 107.646873, zoom: 18 },
    opt: { city: 'ulanude' },
    // 2GIS auto-opens the sole result; duplicate IDs keep the pin without its large popup.
    org: '70000001109835344,70000001109835344'
  };
  var MAP_URL =
    'https://widgets.2gis.com/widget?type=firmsonmap&options=' +
    encodeURIComponent(JSON.stringify(mapOptions));

  // Если контейнер уже содержит iframe — ничего не делаем
  if (mapContainer.querySelector('iframe')) return;

  var iframe = document.createElement('iframe');
  iframe.src = MAP_URL;
  iframe.title = 'Los Santos Studio на карте 2ГИС — ул. Жердева, 29а, Улан-Удэ';
  iframe.loading = 'lazy';
  iframe.allowFullscreen = true;
  iframe.setAttribute(
    'referrerpolicy',
    'strict-origin-when-cross-origin'
  );

  var loaded = false;
  var fallbackTimer;

  function showFallback() {
    if (loaded || mapContainer.querySelector('.map-fallback')) return;
    window.clearTimeout(fallbackTimer);
    iframe.remove();
    var fallback = document.createElement('div');
    fallback.className = 'map-fallback';
    fallback.innerHTML =
      '<i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>' +
      '<p class="map-fallback__address">г. Улан-Удэ, ул. Жердева, 29а</p>' +
      '<a class="btn btn--primary btn--small" target="_blank" rel="noopener noreferrer"' +
      ' href="https://2gis.ru/ulanude/geo/5207922724321626">' +
      '<i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i> Открыть в 2ГИС</a>';
    mapContainer.appendChild(fallback);
  }

  iframe.addEventListener('load', function () {
    loaded = true;
    window.clearTimeout(fallbackTimer);
  });
  iframe.addEventListener('error', showFallback);

  mapContainer.appendChild(iframe);

  function startFallbackTimer() {
    if (!loaded && !fallbackTimer) {
      fallbackTimer = window.setTimeout(showFallback, 8000);
    }
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        observer.disconnect();
        startFallbackTimer();
      }
    }, { rootMargin: '200px' });
    observer.observe(mapContainer);
  } else {
    startFallbackTimer();
  }
});
