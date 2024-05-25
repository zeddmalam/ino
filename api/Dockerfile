FROM node:lts-alpine as build

RUN mkdir /api

WORKDIR /api

COPY package.json .
COPY package-lock.json .
COPY next.config.mjs .
COPY tsconfig.json .
COPY .env .
COPY src src
COPY prisma prisma

RUN npm ci
RUN npm run build

# ---------------

FROM node:lts-alpine

ENV NODE_ENV production
ENV API_PORT 8081

WORKDIR /api

COPY --from=build /api/package.json .
COPY --from=build /api/package-lock.json .
COPY --from=build /api/next.config.mjs .
COPY --from=build /api/.env .
COPY --from=build /api/.next ./.next
COPY --from=build /api/prisma ./prisma

RUN npm ci

EXPOSE 8081

CMD npm start;
