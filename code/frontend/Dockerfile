# Use a Node.js base image to build the frontend application
FROM node:20-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json first (for caching)
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application files
COPY ./frontend/ ./

# Build the frontend application
RUN npm run build

# Use a smaller base image for the final output
FROM node:20-slim

# Install the serve package globally to serve the built files
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Expose port 5173 to access the app
EXPOSE 5173

# Serve the frontend using the static file server
CMD ["serve", "-s", "/app/dist", "-l", "5173"]