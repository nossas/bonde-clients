FROM mhart/alpine-node:latest
MAINTAINER Nossas <tech@nossas.org>

RUN npm install yarn pm2 -g

WORKDIR /app
COPY . ./

RUN yarn

# Expose ports
EXPOSE 5000 3001

# Start process.yml
CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "ecosystem.config.js"]
