FROM node:14-alpine

RUN apk add --no-cache tini

ENV NODE_ENV=production PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm i

COPY . .

RUN npm run prestart

#RUN chown node:node .
#USER node
#COPY package*.json ./
#RUN npm install serve
#COPY --from=builder /usr/src/app/packages/redes-client/build public
#EXPOSE 3000
# ENTRYPOINT [ "/sbin/tini","--", "node -r dotenv/config  ./dist/index.js"]
