# Telemetry UI

## О проекте

Одностраничный **дашборд мониторинга** вендинга: KPI, графики продаж и популярности, карта автоматов, остатки и касса. Данные приходят с **BFF** по REST; на клиенте кэш и запросы через **TanStack Query**. Карта — **Leaflet**.

Код в `src/` разложен по **Feature-Sliced Design**: `app`, `pages`, `widgets`, `features`, `entities`, `shared`. Стили — **SCSS** (`main.scss`).

**Стек:** React 19, TypeScript, Vite, TanStack Query, Leaflet, Sass.

## Запуск

```bash
npm install
npm run dev
```

В терминале появится адрес (обычно [http://localhost:5173](http://localhost:5173)) — откройте его в браузере.

## Данные с бэкенда

В режиме разработки Vite проксирует `/api/bff` на **http://localhost:5165**. Если BFF не запущен, часть экрана может не загрузиться или упасть с ошибкой сети — поднимите мок/BFF на порту **5165** или настройте прокси в `vite.config.ts`.

## Другие команды

| Команда | Назначение |
|--------|------------|
| `npm run build` | Сборка в папку `dist` |
| `npm run preview` | Локальный просмотр продакшен-сборки |
| `npm run lint` | Проверка ESLint |
