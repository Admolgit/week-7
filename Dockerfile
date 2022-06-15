FROM node:alpine
WORKDIR /usr/app

COPY ./package.json ./
RUN yarn install
COPY ./ ./

EXPOSE 8080

CMD ["yarn", "start"]