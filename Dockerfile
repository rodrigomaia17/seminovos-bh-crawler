FROM kkarczmarczyk/node-yarn:4.3.2

WORKDIR /home/seminovos 

COPY . .

RUN yarn

RUN npm run build

CMD ["npm run start"]