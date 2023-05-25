FROM node:20.1.0-alpine3.17

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

ENV API_URL=http://api.myapp.com/

EXPOSE 3000

CMD ["npm", "start"]