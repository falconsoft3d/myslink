
FROM node:12.18.3

WORKDIR /usr/src/app

COPY package*.json ./

# ENV
ENV MONGODB_URI "mongodb://mongo:27017/myslink"
ENV URL_SERVER  "http://localhost:3000"
ENV PASS_SEC = PASSWORD1000
ENV JWT_SEC = OTHER_PASS
ENV TOKEN = TOKEN

RUN npm install

COPY . .

#  RUN npm run build

CMD ["npm", "run", "dev"]