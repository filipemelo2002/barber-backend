FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npx prisma generate

RUN npm run build

CMD ["node", "dist/src/main.js"]