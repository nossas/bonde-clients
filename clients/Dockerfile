FROM node:14-alpine

WORKDIR /code

RUN env

RUN apk --update add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY . .

RUN pnpm i --no-frozen-lockfile

RUN pnpm m run build --filter {libs}
RUN pnpm m run prepare --filter {libs}

RUN SKIP_PREFLIGHT_CHECK=true pnpm m run build --filter {packages}