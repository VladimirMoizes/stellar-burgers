# 🎓 Проектная работа: "stellar-burgers" - учебный проект

<div align="center">
    <img src="https://code.s3.yandex.net/react/code/sauce-01-large.png" width="250" alt="Лого" title="Логотип" style="border-radius: 8px">
</div>


#### 🍔 **Основной функционал**

**Конструктор бургеров:**
- Интерактивное управление ингредиентами:
  - Добавление/удаление компонентов
  - Динамическое изменение порядка
  - Регулировка количества в реальном времени

**Работа с пользователем:**
- Полноценная система аутентификации:
  - Регистрация и вход по JWT
  - Управление сессией
  - Выход из системы

**Оформление заказов:**
- Полный цикл работы:
  - Сборка → Оформление → Отправка
  - История персональных заказов
  - Общая лента заказов

**Управление профилем:**
- Настройки аккаунта:
  - Изменение данных (имя/email)
  - Безопасное обновление пароля
  - Сохранение настроек

**Отображение данных:**
- Двойная система лент:
  - Персональная история
  - Общедоступные заказы


### 🌶️ Технологии:
<div align="center" style="display: flex; gap: 10px; justify-content: center; margin: 12px 0;">
    <a href="https://react.dev/" target="_blank">
    <img title="React" src="https://repository-images.githubusercontent.com/410214337/070f2aba-d9d6-4699-b887-9a0f29015b1b" width="40" height="40" alt="React" style="border-radius:8px">
  </a>
	<a href="https://www.typescriptlang.org/" target="_blank">
    <img title="TypeScript" src="https://camo.githubusercontent.com/477414c66dd07c1314d6dafffc981cf1f0c067b071f1a5e6835686d76d9a36c7/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f747970657363726970742d322e737667" width="40" height="40" alt="TypeScript" style="border-radius:8px">
  </a>
  	<a href="https://redux.js.org/" target="_blank">
    <img title="Redux" src="https://avatars.mds.yandex.net/i?id=fd8d1078fa56a32d83f0c2f51a97f70e4fb35eef-16430162-images-thumbs&n=13" width="40" height="40" alt="webpack" style="border-radius:8px">
  </a>
  	<a href="https://webpack.js.org/" target="_blank">
    <img title="webpack" src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" width="40" height="40" alt="webpack" style="border-radius:8px">
  </a>
</div>

## 🧀 Реализованные задачи по проекту

### 🍔 Конструктор бургеров
- Динамическое **добавление/удаление** ингредиентов
- Изменение **количества** ингредиентов
- Перестановка ингредиентов местами (смена порядка)

### 🌐 Работа с API
- Загрузка данных через **REST API**:
  - Получение списка ингредиентов (`GET /ingredients`)
  - Загрузка истории заказов (`GET /orders`)
- Отправка заказов на сервер (`POST /orders`)
- JWT **авторизация/регистрация**:
  - Разграничение прав для авторизованных пользователей
  - Protected routes для личного кабинета

### 📊 Система заказов
- Персональная лента заказов пользователя
- Общая лента всех заказов
- Детализация каждого заказа с составом

## ⚙️ Технический стек

### Frontend
- **React** (функциональные компоненты + хуки)
- **Redux** (управление состоянием приложения)
- **React Router** (навигация и маршрутизация)

### Build
- **Webpack** (сборка)
- Babel (транспиляция кода)

### 🧪 Тестирование
- **Unit-тесты**: Jest
- **E2E-тесты**: Cypress

### 🏗️ Архитектурные решения
- Оптимизированная структура **Redux store**
- Кастомные хуки для работы с API
- Мемоизация компонентов для производительности
- Гибкая система **роутинга** с защищенными маршрутами

> Проект демонстрирует полный цикл работы с SPA: от взаимодействия с API до сложной клиентской логики

### 🚀 Запуск проекта
**Требования:**
- Node.js v18+ ([скачать](https://nodejs.org/))
- npm v9+
- Git (рекомендуется)

Для запуска проекта выполните:

```
git clone https://github.com/VladimirMoizes/stellar-burgers.git
cd repo
```

```
npm install
```

```
npm run start
```
