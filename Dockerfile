FROM kkarczmarczyk/node-yarn:4.3.2

WORKDIR /home/seminovos 

COPY package.json package.json

RUN yarn

COPY . .

RUN npm run build

CMD ["npm run start"]
