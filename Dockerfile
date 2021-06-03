# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY .env .

EXPOSE 4000
CMD ndoe build/server.js