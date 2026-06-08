# # 1. Node.js official lightweight image
# FROM node:20-alpine

# # 2. Working directory inside container
# WORKDIR /app

# # 3. Copy package files
# COPY package*.json ./

# # 4. Install dependencies
# RUN npm install

# # 5. Copy all backend files
# COPY . .

# # 6. Expose port (Check if your server uses 5000 or something else)
# EXPOSE 5000

# # 7. Command to start backend
# CMD ["npm", "start"]

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]