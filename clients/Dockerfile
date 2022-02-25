FROM node:14-alpine

# Configure all env vars to build imagem
ARG SKIP_PREFLIGHT_CHECK
ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_DOMAIN_ACCOUNTS
ARG REACT_APP_DOMAIN_ADMIN
ARG REACT_APP_DOMAIN_ADMIN_CANARY
ARG REACT_APP_HASURA_API_URL
ARG REACT_APP_DOMAIN_BOT
ARG REACT_APP_DOMAIN_BETA
ARG REACT_APP_AWS_BUCKET
ARG REACT_APP_LOGIN_URL
ARG REACT_APP_DOMAIN_REDES
ARG REACT_APP_UPLOADS_URL
ARG REACT_APP_ZENDESK_ORGANIZATIONS
ARG REACT_APP_DOMAIN_PUBLIC
ARG REACT_APP_API_GRAPHQL_SECRET
ARG REACT_APP_DOMAIN_API_ACTIVISTS
ARG REACT_APP_DOMAIN_API_GRAPHQL
ARG REACT_APP_DOMAIN_API_REST
ARG REACT_APP_PAGARME_KEY
ARG ACTION_SECRET_KEY
ARG REACT_APP_AWS_ROUTE_IP
ARG REACT_APP_HOTJAR_ID
ARG REACT_APP_HOTJAR_SV

# RUN --mount=type=secret,id=SKIP_PREFLIGHT_CHECK \
#   --mount=type=secret,id=REACT_APP_ENVIRONMENT \
#   --mount=type=secret,id=REACT_APP_DOMAIN_ACCOUNTS \
#   --mount=type=secret,id=REACT_APP_DOMAIN_ADMIN \
#   --mount=type=secret,id=REACT_APP_DOMAIN_ADMIN_CANARY \
#   --mount=type=secret,id=REACT_APP_HASURA_API_URL \
#   --mount=type=secret,id=REACT_APP_DOMAIN_BOT \
#   --mount=type=secret,id=REACT_APP_DOMAIN_BETA \
#   --mount=type=secret,id=REACT_APP_AWS_BUCKET \
#   --mount=type=secret,id=REACT_APP_LOGIN_URL \
#   --mount=type=secret,id=REACT_APP_DOMAIN_REDES \
#   --mount=type=secret,id=REACT_APP_UPLOADS_URL \
#   --mount=type=secret,id=REACT_APP_ZENDESK_ORGANIZATIONS \
#   --mount=type=secret,id=REACT_APP_DOMAIN_PUBLIC \
#   --mount=type=secret,id=REACT_APP_API_GRAPHQL_SECRET \
#   --mount=type=secret,id=REACT_APP_DOMAIN_API_ACTIVISTS \
#   --mount=type=secret,id=REACT_APP_DOMAIN_API_GRAPHQL \
#   --mount=type=secret,id=REACT_APP_DOMAIN_API_REST \
#   --mount=type=secret,id=REACT_APP_PAGARME_KEY \
#   --mount=type=secret,id=ACTION_SECRET_KEY \
#   --mount=type=secret,id=REACT_APP_AWS_ROUTE_IP \
#   --mount=type=secret,id=REACT_APP_HOTJAR_ID \
#   --mount=type=secret,id=REACT_APP_HOTJAR_SV \
#   export SKIP_PREFLIGHT_CHECK=$(cat /run/secrets/SKIP_PREFLIGHT_CHECK) && \
#   export REACT_APP_ENVIRONMENT=$(cat /run/secrets/REACT_APP_ENVIRONMENT) && \
#   export REACT_APP_DOMAIN_ACCOUNTS=$(cat /run/secrets/REACT_APP_DOMAIN_ACCOUNTS) && \
#   export REACT_APP_DOMAIN_ADMIN=$(cat /run/secrets/REACT_APP_DOMAIN_ADMIN) && \
#   export REACT_APP_DOMAIN_ADMIN_CANARY=$(cat /run/secrets/REACT_APP_DOMAIN_ADMIN_CANARY) && \
#   export REACT_APP_HASURA_API_URL=$(cat /run/secrets/REACT_APP_HASURA_API_URL) && \
#   export REACT_APP_DOMAIN_BOT=$(cat /run/secrets/REACT_APP_DOMAIN_BOT) && \
#   export REACT_APP_DOMAIN_BETA=$(cat /run/secrets/REACT_APP_DOMAIN_BETA) && \
#   export REACT_APP_AWS_BUCKET=$(cat /run/secrets/REACT_APP_AWS_BUCKET) && \
#   export REACT_APP_LOGIN_URL=$(cat /run/secrets/REACT_APP_LOGIN_URL) && \
#   export REACT_APP_DOMAIN_REDES=$(cat /run/secrets/REACT_APP_DOMAIN_REDES) && \
#   export REACT_APP_UPLOADS_URL=$(cat /run/secrets/REACT_APP_UPLOADS_URL) && \
#   export REACT_APP_ZENDESK_ORGANIZATIONS=$(cat /run/secrets/REACT_APP_ZENDESK_ORGANIZATIONS) && \
#   export REACT_APP_DOMAIN_PUBLIC=$(cat /run/secrets/REACT_APP_DOMAIN_PUBLIC) && \
#   export REACT_APP_API_GRAPHQL_SECRET=$(cat /run/secrets/REACT_APP_API_GRAPHQL_SECRET) && \
#   export REACT_APP_DOMAIN_API_ACTIVISTS=$(cat /run/secrets/REACT_APP_DOMAIN_API_ACTIVISTS) && \
#   export REACT_APP_DOMAIN_API_GRAPHQL=$(cat /run/secrets/REACT_APP_DOMAIN_API_GRAPHQL) && \
#   export REACT_APP_DOMAIN_API_REST=$(cat /run/secrets/REACT_APP_DOMAIN_API_REST) && \
#   export REACT_APP_PAGARME_KEY=$(cat /run/secrets/REACT_APP_PAGARME_KEY) && \
#   export ACTION_SECRET_KEY=$(cat /run/secrets/ACTION_SECRET_KEY) && \
#   export REACT_APP_AWS_ROUTE_IP=$(cat /run/secrets/REACT_APP_AWS_ROUTE_IP) && \
#   export REACT_APP_HOTJAR_ID=$(cat /run/secrets/REACT_APP_HOTJAR_ID) && \
#   export REACT_APP_HOTJAR_SV=$(cat /run/secrets/REACT_APP_HOTJAR_SV)

# Print variables config
RUN env

# Install pnpm to manage dependencies commands to build and start
WORKDIR /code

RUN apk --update add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY . .

RUN pnpm i --no-frozen-lockfile

RUN pnpm m run build --filter {libs}
RUN pnpm m run prepare --filter {libs}

RUN pnpm m run build --filter {packages}