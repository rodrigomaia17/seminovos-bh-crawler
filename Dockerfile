FROM kkarczmarczyk/node-yarn:4.3.2

WORKDIR /home/seminovos 

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npm run buildp

CMD ["npm run start"]
