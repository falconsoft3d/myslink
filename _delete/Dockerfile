FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json .
RUN yarn install


# ENV
ENV MONGODB_URI "mongodb://mongo:27017/myslink"
ENV URL_SERVER  "http://localhost:3000"
ENV PASS_SEC = PASSWORD1000
ENV JWT_SEC = OTHER_PASS
ENV TOKEN = TOKEN

COPY . .

# Building app
RUN yarn build
EXPOSE 3000

# Running the app
CMD ["yarn", "start"]