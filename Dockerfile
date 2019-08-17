FROM node:8-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
# RUN npm install -g yarn
RUN npm install -g babel-cli
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 3000
CMD npm run start:server
