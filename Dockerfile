FROM node:14-alpine

WORKDIR /code
RUN yarn add serve
COPY . .
