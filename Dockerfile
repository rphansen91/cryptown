FROM node:8
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install -g yarn
RUN npm install -g babel-cli
RUN yarn
COPY . /app
RUN yarn build
EXPOSE 3000
CMD ["npm", "run", "start:server"]
