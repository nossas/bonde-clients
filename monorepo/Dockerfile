FROM node:15-alpine AS builder
ENV PORT 3003
ARG NODE_ENV

# USER node
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . /usr/src/app

RUN yarn run build:clients

EXPOSE 5000
# 5001 5002 5003 5004

CMD ["yarn", "run", "start:clients"]
