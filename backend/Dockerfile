# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN yarn build

# Start the app
CMD ["yarn", "start"]
