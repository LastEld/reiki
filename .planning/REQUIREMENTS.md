# Requirements: Reiki Landing Site

**Defined:** 2026-02-10
**Core Value:** Потенциальные клиенты могут легко узнать о практике Reiki и записаться на сеанс онлайн через удобную интеграцию с календарем бронирования.

## v1 Requirements

Requirements for initial premium landing page. Each maps to roadmap phases.

### Hero & First Impression

- [ ] **HERO-01**: Hero-секция с привлекающим заголовком и описанием Reiki
- [ ] **HERO-02**: Премиум фоновое изображение или видео с качественной визуализацией
- [ ] **HERO-03**: Заметная CTA кнопка "Записаться на сеанс"
- [ ] **HERO-04**: Плавная анимация появления элементов при загрузке

### Content Sections

- [ ] **CONT-01**: Секция "О Reiki" с историей практики (Usui Mikao, начало XX века)
- [ ] **CONT-02**: Описание принципов и философии Reiki (Rei + Ki, универсальная энергия)
- [ ] **CONT-03**: Секция "Преимущества" со списком эффектов (снижение стресса, релаксация, эмоциональный баланс)
- [ ] **CONT-04**: Секция "Как проходит сеанс" с описанием процесса (наложение рук, спокойная обстановка)
- [ ] **CONT-05**: Секция "Методология и структура" с объяснением подхода
- [ ] **CONT-06**: Описание целевой аудитории (кому подходит практика)

### Trust & Transparency

- [ ] **TRUST-01**: Научный disclaimer о статусе Reiki как альтернативной практики
- [ ] **TRUST-02**: Явное указание, что Reiki не заменяет медицинскую помощь
- [ ] **TRUST-03**: Честная информация о научной оценке (нет доказательств выше плацебо)
- [ ] **TRUST-04**: Описание ограничений и рисков практики
- [ ] **TRUST-05**: Фото практикующего для установления доверия
- [ ] **TRUST-06**: Информация о квалификации и опыте практикующего

### Pricing & Services

- [ ] **PRICE-01**: Прозрачное отображение стоимости сеансов
- [ ] **PRICE-02**: Описание типов сеансов (индивидуальные, регулярные)
- [ ] **PRICE-03**: Информация о продолжительности сеансов
- [ ] **PRICE-04**: Описание что включает услуга (консультация, сеанс, обсуждение)

### Booking & Contact

- [ ] **BOOK-01**: Контактная форма с валидацией (имя, email, сообщение)
- [ ] **BOOK-02**: Интеграция с Calendly для выбора даты и времени сеанса
- [ ] **BOOK-03**: Google Calendar автоматическая синхронизация через Calendly
- [ ] **BOOK-04**: Отображение контактного телефона с кликабельной ссылкой
- [ ] **BOOK-05**: Отображение email адреса для связи
- [ ] **BOOK-06**: Успешное сообщение после отправки формы
- [ ] **BOOK-07**: Email-уведомление практикующему о новой заявке

### FAQ

- [ ] **FAQ-01**: Секция с частыми вопросами о Reiki
- [ ] **FAQ-02**: Вопросы о безопасности и противопоказаниях
- [ ] **FAQ-03**: Вопросы о научной обоснованности
- [ ] **FAQ-04**: Вопросы о процессе и ожиданиях
- [ ] **FAQ-05**: Аккордеон UI для удобной навигации по вопросам

### Design & UX

- [ ] **UX-01**: Mobile-first responsive дизайн (320px - 1920px+)
- [ ] **UX-02**: Минималистичный премиум дизайн с большим количеством whitespace
- [ ] **UX-03**: Спокойная цветовая палитра (природные, успокаивающие тона)
- [ ] **UX-04**: Красивая типографика с Google Fonts (читаемые, элегантные шрифты)
- [ ] **UX-05**: Smooth scroll с плавной прокруткой между секциями
- [ ] **UX-06**: Fade-in анимации при прокрутке (scroll-triggered)
- [ ] **UX-07**: Hover-эффекты на интерактивных элементах
- [ ] **UX-08**: Качественные изображения с оптимизацией (WebP, правильные размеры)

### Performance

- [ ] **PERF-01**: Время загрузки главной страницы < 3 секунд
- [ ] **PERF-02**: Lighthouse Performance Score > 90
- [ ] **PERF-03**: Core Web Vitals в "Good" диапазоне (LCP, FID, CLS)
- [ ] **PERF-04**: Оптимизация изображений (Next.js Image, ленивая загрузка)
- [ ] **PERF-05**: Минимизация JavaScript bundle размера
- [ ] **PERF-06**: Оптимизация шрифтов (preload, font-display)

### SEO

- [ ] **SEO-01**: Правильные meta tags (title, description) для главной страницы
- [ ] **SEO-02**: Open Graph теги для соц. сетей (og:title, og:description, og:image)
- [ ] **SEO-03**: Структурированные данные Schema.org (LocalBusiness, Service)
- [ ] **SEO-04**: Semantic HTML с правильными заголовками (h1, h2, h3)
- [ ] **SEO-05**: Alt текст для всех изображений
- [ ] **SEO-06**: robots.txt и sitemap.xml
- [ ] **SEO-07**: Canonical URLs настроены правильно

### Multi-Language (i18n)

- [ ] **I18N-01**: Поддержка минимум 2 языков (например, русский + английский)
- [ ] **I18N-02**: Переключатель языков в навигации
- [ ] **I18N-03**: URL-based locale routing (/en, /ru)
- [ ] **I18N-04**: Перевод всех текстов UI и контента
- [ ] **I18N-05**: hreflang теги для SEO мультиязычности
- [ ] **I18N-06**: Определение языка браузера и редирект на соответствующую версию

### Analytics & Tracking

- [ ] **TRACK-01**: Google Analytics 4 интеграция
- [ ] **TRACK-02**: Отслеживание отправки форм как конверсий
- [ ] **TRACK-03**: Отслеживание кликов на CTA кнопки
- [ ] **TRACK-04**: Отслеживание открытия Calendly виджета
- [ ] **TRACK-05**: Cookie consent banner (GDPR compliance)

### Technical Foundation

- [ ] **TECH-01**: Next.js 15 проект с App Router
- [ ] **TECH-02**: TypeScript для type safety
- [ ] **TECH-03**: Tailwind CSS для стилизации
- [ ] **TECH-04**: Static Site Generation (SSG) для всех страниц
- [ ] **TECH-05**: Environment variables правильно настроены (.env.local, .env.production)
- [ ] **TECH-06**: Git repository инициализирован с .gitignore
- [ ] **TECH-07**: ESLint и Prettier настроены
- [ ] **TECH-08**: Vercel или Netlify deployment настроен с автодеплоем

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **CONT-V2-01**: Видео-введение от практикующего (90 секунд)
- **CONT-V2-02**: Раздел с отзывами клиентов (когда будут реальные отзывы)
- **CONT-V2-03**: Блог или образовательные статьи о Reiki

### Advanced Booking

- **BOOK-V2-01**: Онлайн-оплата через Stripe или PayPal
- **BOOK-V2-02**: Система скидок и промокодов
- **BOOK-V2-03**: Автоматические email-напоминания за 24 часа до сеанса

### Personalization

- **UX-V2-01**: AI-персонализация контента на основе поведения
- **UX-V2-02**: Рекомендации типа сеанса на основе целей пользователя

### Extended Analytics

- **TRACK-V2-01**: Heatmaps (Hotjar, Microsoft Clarity)
- **TRACK-V2-02**: A/B тестирование различных версий CTA
- **TRACK-V2-03**: Conversion funnel анализ

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature                                   | Reason                                                             |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Личный кабинет пользователей              | Не нужен для простой записи на сеанс; усложняет MVP                |
| CMS для управления контентом              | Контент определен заранее; статичный сайт проще поддерживать       |
| Чат-поддержка в реальном времени          | Не критично для wellness landing page; контактная форма достаточна |
| Mobile приложение                         | Web-first подход; responsive сайт покрывает мобильные нужды        |
| Система лояльности / membership           | Можно добавить после валидации спроса; не для MVP                  |
| Интеграция с соц. сетями (посты)          | Достаточно Open Graph для sharing; полная интеграция избыточна     |
| Сложная система отчетов для практикующего | Email-уведомления достаточны для начала                            |
| Marketplace других практиков              | Фокус на одном практикующем; расширение позже                      |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| HERO-01     | Phase 2 | Pending |
| HERO-02     | Phase 2 | Pending |
| HERO-03     | Phase 2 | Pending |
| HERO-04     | Phase 2 | Pending |
| CONT-01     | Phase 2 | Pending |
| CONT-02     | Phase 2 | Pending |
| CONT-03     | Phase 2 | Pending |
| CONT-04     | Phase 2 | Pending |
| CONT-05     | Phase 2 | Pending |
| CONT-06     | Phase 2 | Pending |
| TRUST-01    | Phase 2 | Pending |
| TRUST-02    | Phase 2 | Pending |
| TRUST-03    | Phase 2 | Pending |
| TRUST-04    | Phase 2 | Pending |
| TRUST-05    | Phase 2 | Pending |
| TRUST-06    | Phase 2 | Pending |
| PRICE-01    | Phase 2 | Pending |
| PRICE-02    | Phase 2 | Pending |
| PRICE-03    | Phase 2 | Pending |
| PRICE-04    | Phase 2 | Pending |
| BOOK-01     | Phase 3 | Pending |
| BOOK-02     | Phase 5 | Pending |
| BOOK-03     | Phase 5 | Pending |
| BOOK-04     | Phase 3 | Pending |
| BOOK-05     | Phase 3 | Pending |
| BOOK-06     | Phase 3 | Pending |
| BOOK-07     | Phase 3 | Pending |
| FAQ-01      | Phase 3 | Pending |
| FAQ-02      | Phase 3 | Pending |
| FAQ-03      | Phase 3 | Pending |
| FAQ-04      | Phase 3 | Pending |
| FAQ-05      | Phase 3 | Pending |
| UX-01       | Phase 4 | Pending |
| UX-02       | Phase 2 | Pending |
| UX-03       | Phase 2 | Pending |
| UX-04       | Phase 2 | Pending |
| UX-05       | Phase 4 | Pending |
| UX-06       | Phase 4 | Pending |
| UX-07       | Phase 4 | Pending |
| UX-08       | Phase 4 | Pending |
| PERF-01     | Phase 4 | Pending |
| PERF-02     | Phase 4 | Pending |
| PERF-03     | Phase 4 | Pending |
| PERF-04     | Phase 4 | Pending |
| PERF-05     | Phase 4 | Pending |
| PERF-06     | Phase 4 | Pending |
| SEO-01      | Phase 2 | Pending |
| SEO-02      | Phase 2 | Pending |
| SEO-03      | Phase 2 | Pending |
| SEO-04      | Phase 2 | Pending |
| SEO-05      | Phase 2 | Pending |
| SEO-06      | Phase 2 | Pending |
| SEO-07      | Phase 2 | Pending |
| I18N-01     | Phase 6 | Pending |
| I18N-02     | Phase 6 | Pending |
| I18N-03     | Phase 6 | Pending |
| I18N-04     | Phase 6 | Pending |
| I18N-05     | Phase 6 | Pending |
| I18N-06     | Phase 6 | Pending |
| TRACK-01    | Phase 5 | Pending |
| TRACK-02    | Phase 5 | Pending |
| TRACK-03    | Phase 5 | Pending |
| TRACK-04    | Phase 5 | Pending |
| TRACK-05    | Phase 5 | Pending |
| TECH-01     | Phase 1 | Pending |
| TECH-02     | Phase 1 | Pending |
| TECH-03     | Phase 1 | Pending |
| TECH-04     | Phase 1 | Pending |
| TECH-05     | Phase 1 | Pending |
| TECH-06     | Phase 1 | Pending |
| TECH-07     | Phase 1 | Pending |
| TECH-08     | Phase 1 | Pending |

**Coverage:**

- v1 requirements: 58 total
- Mapped to phases: 58/58 ✓
- Unmapped: 0 ✓

---

_Requirements defined: 2026-02-10_
_Last updated: 2026-02-10 after roadmap creation_
