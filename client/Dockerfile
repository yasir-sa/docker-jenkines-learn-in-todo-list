# # 1. Base Image
# FROM node:20-alpine

# # 2. Working Directory inside container
# WORKDIR /app

# # 3. Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # 4. Copy the rest of the frontend code
# COPY . .

# # 5. Vite default port-ஐ எக்ஸ்போஸ் பண்றோம்
# EXPOSE 5173

# # 6. React-ஐ டெவலப்மென்ட் மோட்ல ரன் பண்றோம்
# CMD ["npm", "run", "dev"]
# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]