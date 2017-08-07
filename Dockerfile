FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG APP_DOMAIN=staging.bonde.org
ARG API_URL=https://api.staging.bonde.org
ARG GRAPHQL_URL=https://data.staging.bonde.org
ARG PORT=5001

ENV NODE_ENV=production NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false

COPY package* /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /code /build && cp -a /tmp/node_modules /code/

WORKDIR /code
COPY . /code
EXPOSE 5001

CMD ["npm", "start"]
