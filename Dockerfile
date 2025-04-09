# Use an official lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ENV PORT=4000
ENV NODE_ENV=dev
ENV DB_NAME=kj-mart-database
ENV JWT_SECRET=qwerty-asdf-kj
ENV databaseString="mongodb+srv://kcdhopkins:763ovTMVAuZ0AUKy@kj-database.is2bs.mongodb.net/?retryWrites=true&w=majority&appName=kj-database"

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]