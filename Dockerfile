# Use Node.js 22 Alpine for a lightweight image
FROM node:22-alpine

WORKDIR /app

# Copy package files and Prisma schema
COPY package.json package-lock.json ./ 
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the entire application
COPY . .

# Build Next.js production files
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
