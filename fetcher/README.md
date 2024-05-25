This is a fetcher microservice to fet candidate data. 

The microservice includes api endpoint `/api/patient` which provides a time series for one patient. 

## Getting Started

First, create `.env` file in the `<ROOT>/fetcher` folder. You can use `.env.example` as a reference.

## Local run

1. Install dependencies

```bash
npm i
```

2. Start the app in terminal

```bash
npm run dev
```

3. Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.

## Run in docker

## Test

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
