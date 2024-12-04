# Use a Node.js base image to build the application
FROM node:20-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the frontend application
RUN npm run build

# Install the serve package globally to serve the built files
RUN npm install -g serve

# Expose port 5173 to access the app
EXPOSE 5173

# Serve the frontend using the static file server (assuming build output is in dist/)
CMD ["serve", "-s", "dist", "-l", "5173"]
