## Mesto (backend)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bobandmermaid/Mesto-backend?style=flat-square) 

### О проекте
+ Создание API. Отработка навыка по взаимодействию с Node.js и Express.js  
`Учебный проект сделанный для Яндекс.Практикум`

### Функциональность
+ `localhost:3000` загружает фронтенд проекта [Mesto](https://github.com/bobandmermaid/Mesto);
+ GET-запрос `localhost:3000/users` возвращает JSON-объект со списком пользователей
+ GET-запрос `localhost:3000/cards` возвращает JSON-объект со списком карточек
+ GET-запрос `localhost:3000/users/8340d0ec33270a25f2413b69` возвращает JSON-объект пользователя
+ Если пользователя с запрошенным идентификатором нет, API вернет `404 статус ответа и JSON: { "message": "Нет пользователя с таким id" }`
+ Если запрашиваемого адреса не существует, API вернет `404 статус ответа и JSON: { "message": "Запрашиваемый ресурс не найден" }`

### Стек
`Node.js`  
`Express.js`

### Развёртывание проекта
1. Установить `Node.js`
2. Клонировать репозиторий `https://github.com/bobandmermaid/Mesto-backend.git`
3. Установить зависимости `npm i`
4. `npm run start` запускает сервер на `localhost:3000`
5. `npm run dev` запускает сервер на `localhost:3000` с хот релоудом
