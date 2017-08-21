FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG APP_DOMAIN=staging.bonde.org
ARG API_URL=https://api.staging.bonde.org
ARG GRAPHQL_URL=https://data.staging.bonde.org
ARG PORT=5001

ENV NODE_ENV=production NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false

WORKDIR /code
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 5001

CMD ["yarn", "start"]
