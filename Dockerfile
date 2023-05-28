FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

RUN echo "the env variable set is $DATABASE_URL"

RUN  npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]