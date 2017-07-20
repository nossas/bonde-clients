FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG APP_DOMAIN=staging.bonde.org
ARG API_URL=https://api.staging.bonde.org
ARG GRAPHQL_URL=https://data.staging.bonde.org

ENV NODE_ENV=production NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001

RUN mkdir /code && touch /code/.env
WORKDIR /code

COPY . /code/
RUN yarn install

EXPOSE 5001
