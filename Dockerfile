FROM node:latest as node
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY client/package*.json ./client/
COPY client/public/ ./client/public/
COPY client/src/ ./client/src/
COPY .env ./
#RUN rm -rf node_modules
RUN npm install

WORKDIR /usr/src/app/client/
#RUN rm -rf node_modules
RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
#CMD [ "NODE_ENV=production", "node", "server.js" ]
CMD [ "node", "server.js" ]
