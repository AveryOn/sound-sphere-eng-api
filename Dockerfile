FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p /app/data

# чтобы база сохранялась между перезапусками
VOLUME ["/app/data"]

# миграции сразу на этапе сборки — один раз
RUN npm run migrate

# билд (на основе миграций и актуального кода)
RUN npm run build

CMD ["npm", "run", "start"]
