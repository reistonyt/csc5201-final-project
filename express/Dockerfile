# Stage 1: Build the Next.js application
FROM node:21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the application with Express
FROM node:21
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY server.js ./
COPY utils ./utils
COPY package*.json ./
EXPOSE 3000
CMD ["node", "server.js"]
