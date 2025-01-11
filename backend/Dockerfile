FROM node:18

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy package files first for caching
COPY package.json yarn.lock ./
RUN yarn install

# Globally install nodemon
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Apply migrations and start the development server with nodemon
CMD ["sh", "-c", "npx prisma migrate deploy && nodemon --watch src --exec bun run src/index.ts"]
