/* ==========================================================================
   map-init.js — Инициализация виджета 2ГИС (ТЗ 5.4)
   Los Santos Studio
   Карта подключается через CDN-виджет 2ГИС (iframe).
   См. документацию: https://dev.2gis.com/widget/
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var mapContainer = document.getElementById('map-widget');
  if (!mapContainer) return;

  // URL iframe-виджета 2ГИС: метка на ул. Жердева, 29а, Улан-Удэ
  var MAP_URL =
    'https://widgets.2gis.com/direct?center=87.1706%2C51.8132' +
    '&zoom=16&clips=point%2887.1706%2051.8132%29';

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

  // Graceful fallback: если виджет недоступен (451/блокировка),
  // показываем статичную карточку с адресом и ссылкой на 2ГИС
  var shown = false;
  iframe.addEventListener('load', function () { shown = true; });
  window.setTimeout(function () {
    if (shown) return;
    iframe.remove();
    var fallback = document.createElement('div');
    fallback.className = 'map-fallback';
    fallback.innerHTML =
      '<i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>' +
      '<p class="map-fallback__address">г. Улан-Удэ, ул. Жердева, 29а</p>' +
      '<a class="btn btn--primary btn--small" target="_blank" rel="noopener noreferrer"' +
      ' href="https://2gis.ru/udelan-ude/search/%D0%96%D0%B5%D1%80%D0%B4%D0%B5%D0%B2%D0%B0%2029%D0%B0">' +
      '<i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i> Открыть в 2ГИС</a>';
    mapContainer.appendChild(fallback);
  }, 4000);

  mapContainer.appendChild(iframe);
});
