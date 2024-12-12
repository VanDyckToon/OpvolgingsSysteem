# Stage 1: Build the application
FROM node:20-slim as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from the backend directory
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend application code (adjust path if necessary)
COPY ./backend/ ./

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-slim as production

# Set working directory
WORKDIR /app

# Copy only the built output (dist folder) and package files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Set the environment variables
ENV NODE_ENV=production

# Expose port 3000 (or the port your app listens on)
EXPOSE 3000

# Command to run the app (make sure this script exists in package.json)
CMD [ "npm", "run", "start:prod" ]
