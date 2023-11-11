FROM node:18.17.0-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

# Install node modules

RUN npm install -y --omit=dev

# Build server

RUN npm run build

# Run the server

USER node

EXPOSE 8080

CMD ["npm", "start", "--", "-p", "8080"]
