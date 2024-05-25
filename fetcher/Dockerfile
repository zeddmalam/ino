FROM node:lts-alpine as build

RUN mkdir /fetcher

WORKDIR /fetcher

COPY package.json .
COPY package-lock.json .
COPY next.config.mjs .
COPY tsconfig.json .
COPY .env .
COPY src src

RUN npm ci
RUN npm run build

# ---------------

FROM node:lts-alpine

ENV NODE_ENV production
ENV API_PORT 8081

WORKDIR /fetcher

COPY --from=build /fetcher/package.json .
COPY --from=build /fetcher/package-lock.json .
COPY --from=build /fetcher/next.config.mjs .
COPY --from=build /fetcher/.env .
COPY --from=build /fetcher/.next ./.next

RUN npm ci

EXPOSE 8081

CMD npm start;
