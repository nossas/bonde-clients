FROM node:latest
MAINTAINER Nossas <tech@nossas.org>

RUN set -x \
    && apt-get update \
    && apt-get install -y --no-install-recommends git

WORKDIR /code
COPY mob-render .
EXPOSE 5001
CMD ["./node_modules/.bin/next", "start", "-p", "5001"]
