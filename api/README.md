This is an API to import and view testings. 

The app provides api endpoints 

1. `[POST] /api/patient/import` to import patient with testings.
2. `[GET]  /api/testings` to fetch all testings. 

## Getting Started

First, create `.env` file in the root of a project. You can use `.env.example` as a reference.

## Local run

The recommended way is to run whole project with `docker compose up` from the project root folder. 
But it's still possible to run app separately by:

1. Install dependencies

```bash
npm i
```

2. Start the app in terminal

```bash
npm run dev
```

3. Open [http://localhost:8082](http://localhost:8082) with your browser to see the result.

## Test

1. Start PG and redis. You can do it via `docker compose up` from the root folder.
2. You may need to check your `.env` file and make sure that pg, redis and fetcher hosts are correct. Localhost should work in most cases.
2. Run tests:

```bash
npm test
```
## Lint

```bash
npm run lint
```

## Typecheck

```bash
npm run typecheck
```
