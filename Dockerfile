# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set build argument
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

# Replace environment values
RUN node scripts/replace-env.js

# Generate SSL certificates
RUN node scripts/generate-ssl.js

# Add label for HTTPS support
LABEL com.docker.desktop.port.4200="https://localhost:4200"

# Expose port 4200
EXPOSE 4200

# Start the application with SSL
CMD ["npm", "run", "start:ssl"] 