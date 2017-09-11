FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

ARG TIMEZONE="America/Sao_Paulo"
RUN set -x \
    && apt-get update \
    && apt-get upgrade -y \
    && echo "=> Needed packages:" \
    && apt-get install -y --no-install-recommends apt-utils git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge -y --auto-remove apt-utils

WORKDIR /code
COPY . .
EXPOSE 5001

CMD ["yarn", "start:prod"]
