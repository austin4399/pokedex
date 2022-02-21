FROM node:16.11.1-alpine3.14

RUN apk add --no-cache libc6-compat

RUN npm i -g npm

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

WORKDIR /home/nextjs/app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npx browserslist@latest --update-db
RUN npx next telemetry disable

COPY . .

RUN npm run build

CMD [ "npm", "start" ]