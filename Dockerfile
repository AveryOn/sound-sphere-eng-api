FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# SQLite файл будет храниться в /app/data внутри контейнера
VOLUME ["/app/data"]

CMD ["npm", "run", "start"]
