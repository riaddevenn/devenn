ARG NODE_VERSION=22

# Build stage
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Prod stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

COPY --from=build /app/.output .

EXPOSE 3000

CMD ["node", "./server/index.mjs"]
