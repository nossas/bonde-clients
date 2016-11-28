FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install yarn -g


# Bundle app source
COPY . /usr/src/app

RUN yarn


EXPOSE 3000
CMD [ "node", "./bin/server" ]
