# Step 1: Build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all the source files
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the React app with nginx
FROM nginx:stable-alpine

# Copy built files to nginx server
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
