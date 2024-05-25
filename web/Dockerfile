FROM node:lts-alpine as build

RUN mkdir /web

WORKDIR /web

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY .env .
COPY app app
COPY utils utils
COPY public public

RUN npm ci
RUN npm run build


# ---------------

FROM node:lts-alpine

ENV NODE_ENV production
ENV API_PORT 3001

WORKDIR /fetcher

COPY --from=build /web/package.json .
COPY --from=build /web/package-lock.json .
COPY --from=build /web/.env .
COPY --from=build /web/.next ./.next
COPY --from=build /web/utils ./utils
COPY --from=build /web/public ./public

RUN npm ci

EXPOSE 3001

CMD npm start;
