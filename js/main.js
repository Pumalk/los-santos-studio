/* ==========================================================================
   main.js — Инициализация AOS, бургер-меню, шапка при скролле, cookie-баннер
   Los Santos Studio
   ========================================================================== */

// ---------- Инициализация AOS (ТЗ 5.1) ----------
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }
});

// ---------- Фиксированная шапка с тенью после скролла 100px (ТЗ 4.1) ----------
(function () {
  var header = document.querySelector('.header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---------- Бургер-меню для мобильных (< 768px) ----------
(function () {
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('menu-overlay');
  if (!burger || !menu) return;

  function toggleMenu(forceClose) {
    var isOpen = forceClose === true ? false : !menu.classList.contains('active');
    menu.classList.toggle('active', isOpen);
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    if (overlay) overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    toggleMenu();
  });

  if (overlay) {
    overlay.addEventListener('click', function () {
      toggleMenu(true);
    });
  }

  // Закрытие меню при клике по ссылке-якорю
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true);
    });
  });

  // Закрытие по клавише Escape (доступность с клавиатуры)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggleMenu(true);
  });

  // Сброс состояния при возврате на десктоп
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) toggleMenu(true);
  });
})();

// ---------- Баннер согласия на cookie (ТЗ 7.4) ----------
(function () {
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  if (!banner || !acceptBtn) return;

  var STORAGE_KEY = 'cookie_accepted';
  var STORAGE_TIME_KEY = 'cookie_accepted_at';
  var ACCEPT_DAYS = 30;

  function isAccepted() {
    if (localStorage.getItem(STORAGE_KEY) !== 'true') return false;
    var ts = parseInt(localStorage.getItem(STORAGE_TIME_KEY) || '0', 10);
    if (!ts) return false;
    // Через 30 дней баннер показывается снова
    return Date.now() - ts < ACCEPT_DAYS * 24 * 60 * 60 * 1000;
  }

  if (!isAccepted()) {
    banner.classList.add('visible');
    banner.removeAttribute('hidden');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(STORAGE_TIME_KEY, String(Date.now()));
    banner.classList.remove('visible');
    banner.setAttribute('hidden', '');
  });
})();
