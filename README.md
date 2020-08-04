## Mesto (backend)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bobandmermaid/Mesto-backend?style=flat-square) 

### О проекте
+ REST API проекта Mesto(связано с базой данных). 
`Учебный проект сделанный для Яндекс.Практикум`

### Функциональность

    GET /users — возвращает всех пользователей из базы
    GET /users/:userId - возвращает пользователя по _id
    POST /users — создаёт пользователя с переданными в теле запроса name, about и avatar
    GET /cards — возвращает все карточки из базы
    POST /cards — создаёт карточку с переданными в теле запроса name и link
    DELETE /cards/:cardId — удаляет карточку по _id
    PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
    PUT /cards/:cardId/likes — поставить лайк карточке
    DELETE /cards/:cardId/likes — убрать лайк с карточки
    
### Стек
`Node.js`  
`Express.js`  
`MongoDB`

### Развёртывание проекта
1. Установить `Node.js`
2. Клонировать репозиторий `https://github.com/bobandmermaid/Mesto-backend.git`
3. Установить зависимости `npm i`
4. `npm run start` запускает сервер на `localhost:3000`
5. `npm run dev` запускает сервер на `localhost:3000` с хот релоудом
