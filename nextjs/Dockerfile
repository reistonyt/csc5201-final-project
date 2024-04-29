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
COPY package*.json ./
RUN npm install -g pm2
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/express ./express
EXPOSE 3000
# CMD ["node", "./express/server.js"]
CMD ["pm2-runtime", "start", "./express/server.js", "--name", "express-server", "-i", "4"]
