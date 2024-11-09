# build
FROM node:18.19.0 AS development

WORKDIR /carlo/frontend/src/app

COPY package*.json ./

# Install project dependencies 
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200
