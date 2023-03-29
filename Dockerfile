FROM node:16 AS builder

WORKDIR /app

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

COPY ./.npmrc ./
COPY ./package.json ./

RUN npm install
RUN rm -f .npmrc

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8000

CMD ["npm", "run", "start:prod"]