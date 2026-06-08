# 1. Frontend build
FROM node:18 AS build-client
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# 2. Backend setup
FROM node:22-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./
# Frontend build-ஐ server-ன் public folder-க்கு மாற்றுதல்
COPY --from=build-client /client/dist ./public

EXPOSE 5000
CMD ["node", "server.js"]