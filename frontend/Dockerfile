FROM node:20.20.2

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200

ENV NG_CLI_ANALYTICS=false

CMD ["npm", "run", "start", "--", "--host=0.0.0.0"]
