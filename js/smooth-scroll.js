/* ==========================================================================
   smooth-scroll.js — Плавный скролл к якорям (ТЗ 5.3)
   Los Santos Studio
   ========================================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    // Пропускаем пустые якоря и служебные значения
    if (!href || href === '#' || href.length < 2) return;

    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Обновляем адресную строку без прыжка
      history.pushState(null, '', href);
    }
  });
});
