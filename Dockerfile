FROM node:lts-alpine
RUN npm install --global nodemon
WORKDIR /api-core
COPY package*.json ./
RUN npm install
COPY . . 
ENV NODE_OPTIONS=--max-http-header-size=10485760
EXPOSE 6001
CMD ["npm", "start"]