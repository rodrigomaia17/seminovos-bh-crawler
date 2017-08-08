FROM node:8.2.1

WORKDIR /home/seminovos 

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npm run buildp

CMD ["npm run start"]
