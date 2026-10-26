/* ==========================================================================
   main.js — Инициализация AOS, бургер-меню, шапка при скролле
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

// ---------- Scroll progress, chapter navigation and interactive hero ----------
(function () {
  var progress = document.querySelector('.scroll-progress');
  var chapterLinks = Array.prototype.slice.call(
    document.querySelectorAll('.chapter-nav__link')
  );
  var sections = chapterLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);
  var showcase = document.querySelector('.hero-showcase');
  var showcaseVisual = showcase && showcase.querySelector('.hero-showcase__visual');
  var galleryImages = Array.prototype.slice.call(
    document.querySelectorAll('.gallery-item img')
  );
  var tiltCards = Array.prototype.slice.call(
    document.querySelectorAll('.service-card, .price-card, .advantage-card, .review-card, .gallery-item')
  );
  var sceneButtons = showcase
    ? Array.prototype.slice.call(showcase.querySelectorAll('[data-scene]'))
    : [];
  var sceneLabel = document.getElementById('hero-scene-label');
  var sceneStatus = document.querySelector('#hero-scene-status span');
  var sceneCopy = {
    comfort: { label: 'САЛОН, КОТОРЫЙ ЧУВСТВУЕТ ТЕБЯ', status: 'ФОКУС: КОМФОРТ' },
    mood: { label: 'ТВОЙ ЦВЕТ. ТВОЁ НАСТРОЕНИЕ.', status: 'ФОКУС: АТМОСФЕРА' },
    sound: { label: 'ПОЧУВСТВУЙ КАЖДЫЙ БИТ', status: 'ФОКУС: ЗВУК' }
  };
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function updateProgress() {
    if (progress) {
      var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      var percentage = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progress.style.setProperty('--scroll-progress', String(Math.min(1, Math.max(0, percentage))));
    }

    if (showcaseVisual) {
      var depth = 0;
      if (!reduceMotion) {
        var bounds = showcase.getBoundingClientRect();
        var distance = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight;
        depth = Math.max(-0.5, Math.min(0.5, distance)) * 18;
      }
      showcaseVisual.style.setProperty('--scene-scroll-depth', depth.toFixed(2) + 'px');
    }

    galleryImages.forEach(function (image) {
      var galleryDepth = 0;
      if (!reduceMotion) {
        var imageBounds = image.getBoundingClientRect();
        var imageCenter = imageBounds.top + imageBounds.height / 2;
        var imageDistance = (window.innerHeight / 2 - imageCenter) / window.innerHeight;
        galleryDepth = Math.max(-0.5, Math.min(0.5, imageDistance)) * 20;
      }
      image.style.setProperty('--gallery-scroll-depth', galleryDepth.toFixed(2) + 'px');
    });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window && chapterLinks.length) {
    var chapterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chapterLinks.forEach(function (link) {
          var isCurrent = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });

    sections.forEach(function (section) {
      chapterObserver.observe(section);
    });
  }

  sceneButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var scene = button.getAttribute('data-scene');
      if (!sceneCopy[scene]) return;
      showcase.setAttribute('data-scene', scene);
      sceneButtons.forEach(function (sceneButton) {
        var isActive = sceneButton === button;
        sceneButton.classList.toggle('is-active', isActive);
        sceneButton.setAttribute('aria-pressed', String(isActive));
      });
      if (sceneLabel) sceneLabel.textContent = sceneCopy[scene].label;
      if (sceneStatus) sceneStatus.textContent = sceneCopy[scene].status;
    });
  });

  if (showcase && window.matchMedia('(pointer: fine)').matches) {
    showcase.addEventListener('pointermove', function (event) {
      var bounds = showcase.getBoundingClientRect();
      var x = (event.clientX - bounds.left) / bounds.width - 0.5;
      var y = (event.clientY - bounds.top) / bounds.height - 0.5;
      showcase.style.setProperty('--scene-rotate-y', (x * 3).toFixed(2) + 'deg');
      showcase.style.setProperty('--scene-rotate-x', (y * -3).toFixed(2) + 'deg');
    });

    showcase.addEventListener('pointerleave', function () {
      showcase.style.setProperty('--scene-rotate-x', '0deg');
      showcase.style.setProperty('--scene-rotate-y', '0deg');
    });
  }

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var bounds = card.getBoundingClientRect();
        var x = (event.clientX - bounds.left) / bounds.width - 0.5;
        var y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--card-rotate-y', (x * 4).toFixed(2) + 'deg');
        card.style.setProperty('--card-rotate-x', (y * -4).toFixed(2) + 'deg');
        if (card.classList.contains('service-card')) {
          card.style.setProperty('--pointer-x', ((x + 0.5) * 100).toFixed(1) + '%');
          card.style.setProperty('--pointer-y', ((y + 0.5) * 100).toFixed(1) + '%');
        }
      });

      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--card-rotate-x', '0deg');
        card.style.setProperty('--card-rotate-y', '0deg');
      });
    });
  }
})();

// ---------- Seamless, viewport-filling ticker ----------
(function () {
  var strip = document.querySelector('.road-strip');
  var track = strip && strip.querySelector('.road-strip__track');
  var sets = track
    ? Array.prototype.slice.call(track.querySelectorAll('.road-strip__set'))
    : [];
  var sourceGroup = sets[0] && sets[0].querySelector('.road-strip__group');
  if (!strip || !track || sets.length !== 2 || !sourceGroup) return;

  function fillTicker() {
    var requiredWidth = strip.clientWidth;

    sets.forEach(function (set) {
      set.innerHTML = '';
      var group = sourceGroup.cloneNode(true);
      set.appendChild(group);

      while (set.scrollWidth < requiredWidth) {
        set.appendChild(group.cloneNode(true));
      }
    });
  }

  fillTicker();
  if ('ResizeObserver' in window) {
    var resizeObserver = new ResizeObserver(fillTicker);
    resizeObserver.observe(strip);
  } else {
    window.addEventListener('resize', fillTicker);
  }
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
    menu.setAttribute('aria-hidden', String(!isOpen));
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
