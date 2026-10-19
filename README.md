# Los Santos Studio

Одностраничный сайт автостудии по установке автозвука и дополнительного оборудования в Улан-Удэ. Статичный лендинг: HTML5 + CSS3 (без препроцессоров) + Vanilla JS.

## Структура проекта

```
├── index.html                # Главная страница
├── css/                      # main / components / animations / responsive / docs
├── js/                       # main.js, smooth-scroll.js, map-init.js
├── libs/                     # Локальные копии AOS и Font Awesome 6 Free
├── media/                    # logo/, favicon/, gallery/ (плейсхолдеры работ)
├── docs/                     # privacy-policy, terms-of-use, cookie-policy
├── sitemap.xml
└── robots.txt
```

## Локальный запуск

Открыть `index.html` в браузере (например, через Live Server в VS Code), либо:

```bash
python -m http.server 8000
# открыть http://localhost:8000
```

## Деплой на GitHub Pages

1. Создать репозиторий на GitHub и запушить все файлы:
   ```bash
   git init
   git add .
   git commit -m "Los Santos Studio: initial site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/los-santos-studio.git
   git push -u origin main
   ```
2. **Settings → Pages → Source:** Deploy from a branch → `main` → `/ (root)`.
3. Сайт станет доступен по адресу `https://USERNAME.github.io/los-santos-studio/`.

> **Важно для GitHub Pages под папкой репозитория:** все пути в проекте абсолютные (`/css/...`, `/media/...`). При деплое в `https://USERNAME.github.io/los-santos-studio/` замените префикс `/` на `/los-santos-studio/` во всех тегах `link/script/img` и в `site.webmanifest`, либо деплойте репозиторий как пользовательский сайт (`USERNAME.github.io`), где корень `/` работает сразу. После переезда на домен `los-santos-studio.ru` пути снова станут корректными без правок.

## Переезд на домен los-santos-studio.ru

1. Зарегистрировать домен `los-santos-studio.ru`.
2. **Settings → Pages → Custom domain:** указать `los-santos-studio.ru`.
3. Настроить DNS у регистратора:
   - `CNAME` для `@` → `USERNAME.github.io` (или ALIAS/ANAME, если поддерживается);
   - 4 A-записи на IP GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
4. Включить **Enforce HTTPS** в настройках Pages.
5. Обновить в коде: `canonical`, Open Graph `og:url`/`og:image`, JSON-LD `url`, контакты в `/docs/*` — они уже указывают на `https://los-santos-studio.ru`; при временном использовании GitHub Pages замените на фактический адрес.
6. Обновить `sitemap.xml` (адреса в нём уже указаны для `los-santos-studio.ru`).
7. Подтвердить права в Google Search Console и Яндекс.Вебмастере, отправить `sitemap.xml` на индексацию.

## Сопровождение

- **Замена плейсхолдеров галереи:** когда команда предоставит фото, замените файлы `/media/gallery/placeholder-*.jpg`, сохранив имена (400×300, соотношение 4:3). Перед коммитом оптимизируйте изображения через TinyPNG/ImageOptim.
- **Логотип:** `/media/logo/logo-compressed.webp` размещается на кремовом фоне без дополнительных стилизаций.
- **Тестирование:** Chrome DevTools (Device Mode) и Lighthouse (Performance, Accessibility, SEO, Best Practices). После релиза прогнать аудит на https://auditikk.ru.

## Лицензии используемых ресурсов

- Шрифты Oswald, Inter, Caveat — Google Fonts, SIL Open Font License.
- Иконки Font Awesome 6 Free — CC BY 4.0.
- AOS (Animate On Scroll) — MIT License. Локальные копии в `/libs/aos/`.

© 2026 Los Santos Studio. Все права защищены.
