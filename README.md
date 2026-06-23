# URL Checker — фронтенд

SPA для сервиса асинхронной проверки URL: создание задания, список заданий,
детальный статус с опросом в реальном времени и отмена на лету.

**Стек:** React 18 · TypeScript · Vite · Ant Design 5 · TanStack React Query 5
(кодоген из OpenAPI) · Zustand. Хранилище серверного состояния — целиком на
React Query; Zustand держит только `activeJobId`.

Собран по **каноническому Feature-Sliced Design** (`app · pages · widgets ·
features · entities · shared`, импорты только вниз). Слой работы с API
**генерируется** из OpenAPI-схемы бэкенда в типизированные хуки React Query.

> Бэкенд — в отдельном репозитории (`test-3205.backend`), слушает порт `3000`.
> Полный контракт API — в его Swagger UI на `/api/docs`.

## Архитектура (FSD)

```
src/
  app/        # провайдеры (ConfigProvider · QueryClient · Ant App) · ErrorBoundary
  pages/jobs/ # композиция экрана (Row/Col), без логики
  widgets/    # job-list · job-detail (UrlResultsTable · JobProgress)
  features/   # create-job · cancel-job (форма/кнопка + мутации)
  entities/   # job: статусы · activeJobId-стор · опрос (api) · StatusTag
  shared/     # api/jobs (сгенерировано) · api/httpClient · lib/format
api_schema/   # openapi.json — вход для кодогенерации
```

Зависимости идут строго вниз: `app → pages → widgets → features → entities →
shared`. Сгенерированный клиент лежит в `shared/api/jobs`, а доменные
хуки-обёртки (`useJobsQuery`, `useJobDetailQuery`, мутации) добавляют поверх него
опрос и инвалидацию и экспортируются через публичный `index.ts` слайса.

## Требования

- Node.js 20+
- npm
- Запущенный бэкенд URL Checker на `http://localhost:3000` (для dev-прокси)

## Установка и запуск (dev)

```bash
npm install
npm run dev          # http://localhost:5173
```

Vite проксирует `/api` → `http://localhost:3000` (`server.proxy` в
`vite.config.ts`), поэтому в браузере всё остаётся same-origin и CORS не нужен.
Цель прокси переопределяется через `VITE_DEV_PROXY_TARGET`.

## Сборка (prod)

```bash
npm run build        # tsc -b && vite build → dist/
npm run preview      # локальный предпросмотр собранного билда
```

## Генерация API-клиента

Клиент React Query сгенерирован и **закоммичен** (`src/shared/api/jobs`), поэтому
для запуска ничего генерировать не нужно. Перегенерировать после изменения
контракта бэкенда (тот пишет свежий `api_schema/openapi.json` командой
`npm run openapi:json`):

```bash
npm run generate-api   # openapi-rq -i ./api_schema/openapi.json -o ./src/shared/api/jobs
```

## Конфигурация (переменные окружения)

| Переменная              | Где            | Назначение                                         |
| ----------------------- | -------------- | -------------------------------------------------- |
| `VITE_DEV_PROXY_TARGET` | dev            | Куда Vite проксирует `/api` (по умолчанию `http://localhost:3000`) |
| `VITE_API_BASE_URL`     | build-arg      | Базовый путь API в сборке (в Docker = `/api`)      |

## Docker

```bash
# Собрать образ (nginx + статика):
docker build -t url-checker-frontend --build-arg VITE_API_BASE_URL=/api .

# Запустить; nginx проксирует /api на бэкенд по BACKEND_HOST:BACKEND_PORT:
docker run -p 8080:80 -e BACKEND_HOST=host.docker.internal -e BACKEND_PORT=3000 url-checker-frontend
# → http://localhost:8080
```

В рантайме nginx подставляет `BACKEND_HOST`/`BACKEND_PORT` в свой конфиг через
`envsubst` (см. `nginx.conf`). Браузер всегда ходит на относительный `/api` —
один и тот же код в dev (Vite-прокси) и в prod (nginx).

## Тесты

```bash
npm test             # vitest run
npm run test:watch   # watch-режим
npm run lint
```

Ключевое: `pollInterval.test` — терминальный статус останавливает опрос (чистая
функция, без React Query); `parseUrls.test` — разбор textarea; `CreateJobForm.test`
— пустая отправка отклоняется, валидная уходит с разобранным списком и форма
сбрасывается; `format.test` — форматтеры; `App.test` — смоук-рендер всего дерева
провайдеров (ConfigProvider → QueryClient → Ant App → страница).
