# INTER PROJECT

## Prerequisites

- Node.js >= 12 - Backend environment
- MySQL >= 8.0 - Main database

## Quick start

Install node modules

```bash
npm i
```

Start source

```bash
npm start
```

## Sequelize

Generate migrations from Sequelize models

```bash
desc=<description-for-migration> npm run db:generate:migrations
```

Check migration status

```bash
npm run db:migrate:status
```

Apply new migrations

```bash
npm run db:migrate
```

Undo migrations

```bash
npm run db:migrate:undo
```
