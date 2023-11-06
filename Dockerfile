FROM node:18-alpine

RUN npm install -g ts-node

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]