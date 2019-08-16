
FROM node:8

RUN mkdir /nodejs_aura
WORKDIR /nodejs_aura
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8002