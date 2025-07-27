# Use a Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 5000

# Command to start your Node.js application
# Ensure your package.json has a "start" script, e.g., "node server.js"
CMD ["npm", "start"]