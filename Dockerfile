FROM node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn

# ENV
ENV MONGO_URL "mongodb://localhost:27017/myslink"
ENV URL_SERVER  "http://localhost:3000"
ENV PASS_SEC = PASSWORD1000
ENV JWT_SEC = OTHER_PASS
ENV TOKEN=TOKEN

# Copying source files
COPY . /usr/src/app

# Building app
RUN yarn build
EXPOSE 3000

# Running the app
CMD "yarn" "start"