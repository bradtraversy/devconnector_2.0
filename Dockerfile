FROM node:latest as node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install
#RUN 'cd client ; npm install ; npm run build ; cd ..'

WORKDIR /usr/src/app/client/
COPY package*.json ./
#RUN cd client
RUN rm -rf node_modules
RUN npm install
#RUN npm ci --only=production
RUN npm run build:production
#RUN cd ..
#RUN NODE_ENV=production node server.js
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "NODE_ENV=production", "node", "server.js" ]
