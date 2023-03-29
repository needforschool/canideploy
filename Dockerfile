FROM node:16 AS builder

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8000

CMD ["npm", "run", "start:prod"]