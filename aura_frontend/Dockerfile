FROM node:8
RUN mkdir /react_redux
WORKDIR /react_redux
COPY package.json .
RUN npm install
COPY . .
EXPOSE 6075