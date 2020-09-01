FROM node:14.0.0-stretch

WORKDIR /app/

COPY ./package.json ./package-lock.json /app/

RUN npm i

CMD npx nodemon ./server.js localhost ${PORT}