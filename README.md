# Glovo Menu Tool API — docs

**Сайт:** https://glovo-menutool.up.railway.app/

- EN (основна): https://glovo-menutool.up.railway.app/
- UA: https://glovo-menutool.up.railway.app/ua/
- Postman-колекція: https://glovo-menutool.up.railway.app/Glovo_Menu_Tool_API.postman_collection.json

Старе `/en/` редіректить на `/`.

Джерело: OpenAPI-специфікація [AlterEGO-digital/swagger](https://github.com/AlterEGO-digital/swagger) (остання зміна — 28.10.2023). Неофіційна документація.

## Локально
```bash
npm start   # http://localhost:3000
```

## Деплой
Сервіс `glovo-menu-api-docs` на Railway підключений до гілки `main` цього репозиторію — кожен push у `main` деплоїться автоматично.

Ручний деплой через CLI (з папки проєкту):
```bash
railway up --ci -y --service glovo-menu-api-docs
```
