FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

RUN npm install --production

# Copy only what you need
COPY . .

CMD ["node", "mailSubscriber.js"]
