FROM node:14

WORKDIR /usr/src/app


COPY . .

RUN npm install

EXPOSE 3030

CMD ["node","index.js"]