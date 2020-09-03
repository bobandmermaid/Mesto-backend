## Mesto (backend)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bobandmermaid/Mesto-backend?style=flat-square) 

### О проекте
+ Mesto – интерактивный сервис для работы с фотографиями.           
`Учебный проект сделанный для Яндекс.Практикум`

### Функциональность
    Запросы с сервера - https://api.bobandmermaid.tk/        
    (например https://api.bobandmermaid.tk/users)
    
    POST /signup — регистрация пользователя с переданными в теле запроса:    
     name, about, avatar, email, password
    POST /signin — авторизация пользователя по email и password 
    GET /users — возвращает всех пользователей из базы
    GET /users/:userId - возвращает пользователя по _id
    GET /cards — возвращает все карточки из базы
    POST /cards — создаёт карточку с переданными в теле запроса name и link
    DELETE /cards/:cardId — удаляет карточку по _id
    PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
    PUT /cards/:cardId/likes — поставить лайк карточке
    DELETE /cards/:cardId/likes — убрать лайк с карточки
    
### Стек
`HTML`    
`CSS`    
`JavaScript`     
`Node.js`  
`Express.js`  
`MongoDB`   
`ESlint`

### Доступ к серверу
+ IP адрес: http://130.193.37.224
+ Фронтенд проекта: https://bobandmermaid.tk

### Развертывание проекта
1. Клонировать репозиторий `https://github.com/bobandmermaid/Mesto-backend.git`
2. Установить зависимости `npm i`
3. `npm run start` запускает сервер на `localhost:3000`
4. `npm run dev` запускает сервер на `localhost:3000` с хот релоудом
