FROM kkarczmarczyk/node-yarn
MAINTAINER Nossas <tech@nossas.org>

ENV NEW_RELIC_HOME=./src NODE_ENV=production NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001
ENV API_URL=api-ssl.bonde.org APP_DOMAIN=bonde.org PAGARME_KEY=aaa GOOGLE_FONTS_API_KEY=aaa

RUN mkdir /code

WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn
COPY . /code
RUN yarn heroku-postbuild
CMD ["yarn", "start:prod"]

EXPOSE 5001 3030
