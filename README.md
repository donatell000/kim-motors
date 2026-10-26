# Kim Motors

Одностраничный сайт компании Kim Motors: подбор и доставка автомобилей из Южной Кореи и Китая в Кыргызстан.

Стек: Next.js 16 (App Router), React 19, TypeScript, Framer Motion, CSS Modules, Playwright для тестов.

## Запуск

```bash
npm install
npm run dev      # разработка, http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск собранной версии
npm run lint
npx playwright test   # тесты; сами поднимают dev-сервер (нужен установленный Chrome)
```

## Переменные окружения

Все необязательные. Задаются при деплое (например, в Vercel → Environment Variables).

| Переменная | Зачем |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Адрес сайта без `/` в конце. Используется в canonical, Open Graph, sitemap, robots и JSON-LD. По умолчанию `https://kimmotors.ru` — **замените на реальный домен.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Код подтверждения из Google Search Console (значение `content` метатега). |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Код подтверждения из Яндекс.Вебмастера. |

## Структура

```
app/
  layout.tsx          метаданные, Open Graph, JSON-LD (AutoDealer + WebSite)
  page.tsx            главная: порядок секций
  privacy/            страница «Политика конфиденциальности»
  icon.tsx, apple-icon.tsx, manifest.ts   иконки и манифест (PNG генерируются при сборке)
  opengraph-image.jpg превью ссылки 1200×630
  robots.ts, sitemap.ts
components/
  hero, advantages, about, platforms, selection, process, clients, contact, logistics
                      секции страницы, у каждой свой *.module.css
  welcome/            заставка; через IntroContext сообщает первому экрану, что можно анимироваться
  reveal/             общие анимации появления (Reveal, RevealTitle, Accent) и useTypewriter
  motion/             MotionProvider: отключает анимации при prefers-reduced-motion
  fade-image/         next/image с плавным проявлением после загрузки
lib/
  site.ts             домен, телефон, WhatsApp, соцсети — менять контакты только здесь
  icon.ts             знак «K» для фавиконки и иконок
tests/                Playwright: вёрстка секций на разных ширинах, отсутствие горизонтального скролла
```

## Что важно знать

- **Форма заявки не отправляет данные на сервер.** Она собирает текст и открывает WhatsApp с готовым сообщением. Бэкенда у сайта нет.
- **Поиск по трек-номеру** в блоке «Логистика» — заглушка: после отправки предлагает написать менеджеру.
- **Анимации.** Общие настройки (кривая, порог срабатывания) лежат в `components/reveal/Reveal.tsx`. Элементы, которые анимация прячет до появления, помечены `data-reveal`: без JavaScript `app/globals.css` показывает их сразу. Новые скрытые анимацией элементы тоже помечайте этим атрибутом.
- **Tailwind** подключён (`@import "tailwindcss"` в `globals.css`), но утилитарные классы не используются, работает только его базовый сброс стилей. Если убирать Tailwind, проверьте вёрстку: сброс влияет на отступы и картинки.
- **Шрифт `Benzin-Bold`** указан в стилях формы и логистики, но не подключён — сейчас вместо него показывается Arial Black.

## Что осталось сделать

- Указать реальный домен (`NEXT_PUBLIC_SITE_URL`).
- Заполнить реквизиты в `app/privacy/page.tsx` (места с пометкой `[заполнить]`), после этого можно убрать `noindex` с этой страницы.
- Подтвердить сайт в Google Search Console и Яндекс.Вебмастере, отправить туда `sitemap.xml`.
- По желанию: блок FAQ с разметкой FAQPage, Яндекс Метрика / Google Analytics с целями на клики в WhatsApp.
