# Chrome Web Store — данные для публикации

Всё, что нужно заполнить в [Developer Dashboard](https://chrome.google.com/webstore/devconsole). Тексты готовы к копированию.

## 1–2. Регистрация, оплата и загрузка

Пошаговая инструкция вынесена в отдельный файл: **[PUBLISH_GUIDE.md](PUBLISH_GUIDE.md)** (двухэтапная аутентификация, регистрация и взнос $5, настройка аккаунта, загрузка zip, отправка на проверку, обновления).

Ниже только тексты и ответы, которые нужно вставить в кабинет. Ссылка на политику конфиденциальности: [Apeex Tools — Privacy Policy](https://claude.ai/artifact/JwG4qM7dZkxQyVhgEJVHtQ), локальная копия [PRIVACY.md](PRIVACY.md). Перед отправкой откройте к ней доступ **Anyone with the link** и впишите email поддержки.

## 3. Package → Store listing

**Название** (берётся из манифеста, ≤ 75 символов)
- EN: `Apeex Tools — New Tab & Visual Bookmarks`
- RU: `Apeex Tools — визуальные закладки и экспресс-панель`

**Краткое описание** (из манифеста, ≤ 132 символа)
- EN: A clean new tab: visual bookmarks in sections, crisp brand icons, any search engine, themes and bookmark folder import.
- RU: Чистая новая вкладка: визуальные закладки по разделам, чёткие иконки, любые поисковики, темы и импорт папок закладок.

**Категория:** Productivity → Workflow & Planning (или Tools)
**Язык по умолчанию:** English (русская версия подтянется из `_locales/ru`)

### Подробное описание — RU

```
Apeex Tools — рабочий стол вашего браузера от команды Apeex. Всё, с чем вы работаете, разложено под рукой, поэтому новая вкладка никогда не открывается пустой.

• Визуальные закладки по разделам: «Работа», «Google», «AI» — сколько угодно разделов и ссылок, без ограничений.
• Готовые наборы: выберите профиль (автолюбитель, дизайнер, разработчик, маркетолог, менеджер, студент, геймер, автор контента) и получите нужные сервисы по разделам, плюс общие разделы AI, Google, Развлечения, Соцсети. Набор автолюбителя подбирается под регион: для России и для Европы свои объявления, СМИ, запчасти, проверка авто, схемы и мануалы.
• Чёткие иконки: встроенная библиотека из 200+ логотипов популярных сервисов (Gmail, Drive, Notion, Slack, GitHub, ChatGPT, Figma…), для остальных сайтов иконка подбирается автоматически. Можно задать свою.
• Любой поисковик: Google, Яндекс, DuckDuckGo, Bing, Brave, Perplexity, ChatGPT, YouTube и другие в один клик — или свой по шаблону URL.
• Импорт за минуту: папки закладок Chrome сразу становятся разделами, видно что импортируется. Также импорт открытых вкладок и HTML-файла закладок из любого браузера.
• Темы: светлая, песочная, тёмная, чёрная (OLED) и авто по системе; 9 акцентных цветов; три размера плиток.
• Перетаскивание: меняйте порядок плиток и разделов, переносите ссылку в другой раздел, бросив её на вкладку.
• Резервная копия одним файлом: ссылки, разделы, поисковики и настройки.
• Приватность: всё хранится только в вашем браузере. Никакой аналитики, рекламы и серверов.
• 30 языков интерфейса.

В готовые наборы по умолчанию добавлена ссылка на сайт разработчика Apeex (apeex.io). Это обычная плитка, её можно снять галочкой при выборе набора или удалить в один клик.
```

### Подробное описание — EN

```
Apeex Tools is the desk of your browser, made by the Apeex team: everything you work with is laid out within reach, so a new tab never opens on an empty page.

• Visual bookmarks in sections: Work, Google, AI — as many sections and links as you like, no limits.
• Ready-made sets: pick a profile (car enthusiast, designer, developer, marketer, manager, student, gamer, creator) and get its services in sections, plus shared AI, Google, Fun and Social sections. The car set adapts to your region: Russia and Europe each get their own listings, news, parts, vehicle checks, wiring diagrams and manuals.
• Crisp icons: a built-in library of 200+ logos for popular services (Gmail, Drive, Notion, Slack, GitHub, ChatGPT, Figma…); other sites get their icon automatically, or set your own.
• Any search engine: Google, Bing, DuckDuckGo, Brave, Yandex, Perplexity, ChatGPT, YouTube and more in one click, or your own via a URL template.
• Import in a minute: Chrome bookmark folders become sections, and you see exactly what gets imported. You can also import open tabs or a bookmarks HTML file from any browser.
• Themes: light, sand, dark, black (OLED) and auto; 9 accent colors; three tile sizes.
• Drag and drop: reorder tiles and sections, move a link by dropping it on another section.
• One-file backup: links, sections, search engines and settings.
• Private: everything stays in your browser. No analytics, no ads, no servers.
• 30 interface languages.

The ready-made sets include a link to the developer's own site, Apeex (apeex.io), by default. It is an ordinary tile: untick it when picking a set, or delete it in one click.
```

## 4. Privacy practices (вкладка Privacy)

**Disclosure.** Связанные с разработчиком ссылки (apeex.io в готовых наборах) названы в описании выше. Не убирайте эту строку: недекларированное продвижение продуктов разработчика — частая причина жалоб и отказов.

**Single purpose description**
> Replaces Chrome's new tab page with a customizable page of visual bookmarks grouped into sections, with a search box.

**Permission justifications**

| Permission | Justification |
|---|---|
| `storage` | Saves the user's links, sections, search engines and settings locally in the browser. |
| `unlimitedStorage` | Users keep hundreds of links and uploaded custom icons; the default local quota is too small and saving would fail silently. |
| `bookmarks` (optional) | Requested only when the user clicks "Import Chrome bookmark folders", to list their folders so they can choose which to import. Bookmarks are read once and never modified. |
| `tabs` (optional) | Requested only when the user clicks "Import open tabs", to list open tab titles and URLs so they can choose which to add as links. |
| New tab override | The extension's single purpose is to provide the new tab page. |

**Remote code:** No, I am not using remote code. (Все скрипты внутри пакета.)

**Data usage:** не отмечать ни одной категории данных: расширение ничего не собирает и не передаёт. Поставить все три подтверждения:
- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:** `https://claude.ai/artifact/JwG4qM7dZkxQyVhgEJVHtQ` (после того как откроете доступ по ссылке; проверьте её в режиме инкогнито).

## 5. Distribution

- Visibility: Public (или Unlisted, чтобы сначала раздать по ссылке)
- Regions: All regions
- Pricing: Free

## 6. Графика

| Что | Размер | Обязательно |
|---|---|---|
| Иконка | 128×128 PNG (логотип 96×96 + прозрачные поля по 16 px) | да, готово: `icons/icon128.png`, исходник `icons/source/apeex-glow.svg` |
| Скриншоты | 1280×800 или 640×400, от 1 до 5 штук | да |
| Малый промо-баннер | 440×280 PNG/JPG | желательно |
| Marquee | 1400×560 | только для подборок |

Что снять на скриншоты (окно 1280×800, без личных ссылок и данных):
1. Окно «Добро пожаловать» с выбором профиля
2. Главный экран, светлая тема, раздел с узнаваемыми сервисами
3. Тёмная тема
4. Окно «Выберите папки» при импорте закладок
5. Песочная тема или окно настроек с темами и цветами

## 7. Проверка и обновления

- Первая проверка обычно занимает от нескольких часов до 3 рабочих дней, иногда до 2–3 недель. Статус виден в кабинете, решение приходит на contact email. Подробнее про ожидание и публикацию в день запуска (deferred publishing): [PUBLISH_GUIDE.md](PUBLISH_GUIDE.md). Расширения с `bookmarks` и `tabs` иногда проверяют дольше, но здесь оба разрешения необязательные, это помогает.
- Можно сначала выбрать Visibility: **Unlisted**: расширение будет доступно только по прямой ссылке. Проверку оно проходит **так же, как Public**, пропустить её нельзя. Видимость меняется в кабинете позже; нужна ли повторная проверка при смене, смотрите подсказку в самом кабинете.
- При отказе придёт письмо с причиной. Исправьте и отправьте снова, повторная проверка обычно быстрее.
- Для обновления поднимите `version` в `manifest.json`, снова запустите `./tools/package.sh` и загрузите новый zip в тот же элемент.

## Частые причины отказа и как они закрыты

- **Лишние разрешения**: `tabs` и `bookmarks` вынесены в `optional_permissions` и запрашиваются по клику.
- **Нет политики конфиденциальности**: опубликована, см. [PUBLISH_GUIDE.md](PUBLISH_GUIDE.md), шаг 0.
- **Описание не совпадает с функциями**: тексты выше описывают только то, что реально есть.
- **Удалённый код**: всё в пакете. Внешние запросы идут только за картинками иконок и не загружают код.
- **Персональные данные в стандартных ссылках**: заменены на нейтральный набор (Gmail, Drive, ChatGPT, GitHub…).
- **Торговые марки**: логотипы сервисов используются только как иконки ссылок на эти сервисы, это стандартная практика для визуальных закладок. Не используйте чужие логотипы в иконке расширения и на промо-картинках.
