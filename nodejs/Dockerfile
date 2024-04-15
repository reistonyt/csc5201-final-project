# Stage 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the application with Express
FROM node:14
WORKDIR /app
COPY --from=build /app/build ./build
# Copy the server script and package.json for dependencies
COPY server.js ./
COPY package*.json ./
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]
