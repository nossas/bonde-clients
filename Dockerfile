FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG APP_DOMAIN=staging.bonde.org
ARG API_URL=https://api.staging.bonde.org
ARG GRAPHQL_URL=https://data.staging.bonde.org
ARG PORT=5001

ENV NODE_ENV=production NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false

ARG TIMEZONE="America/Sao_Paulo"
RUN set -x \
    && apt-get update \
    && apt-get upgrade -y \
    && echo "=> Needed packages:" \
    && apt-get install -y --no-install-recommends apt-utils git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge -y --auto-remove apt-utils

WORKDIR /code
COPY yarn.lock .
RUN mkdir build && yarn install
COPY . .
EXPOSE 5001

CMD ["yarn", "start"]
