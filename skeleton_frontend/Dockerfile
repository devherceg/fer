# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:14 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Angular app with the production configuration
RUN npm run build

# Use a lightweight Nginx image for serving the application
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx web root directory
COPY --from=build-stage /app/dist/skeleton_frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]