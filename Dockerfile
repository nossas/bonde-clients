FROM kkarczmarczyk/node-yarn
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG AWS_ACCESS_KEY_ID=1
ARG AWS_SECRET_ACCESS_KEY=1
ENV NEW_RELIC_HOME=./src NODE_ENV=production NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001 \
    API_URL=server.staging.bonde.org APP_DOMAIN=staging.bonde.org PAGARME_KEY=aaa GOOGLE_FONTS_API_KEY=aaa

RUN mkdir /code

WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn
COPY . /code
RUN touch .env
RUN AWS_BUCKET=$AWS_BUCKET AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY yarn heroku-postbuild
CMD ["yarn", "start:prod"]

EXPOSE 5001
