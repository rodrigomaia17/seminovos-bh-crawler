import { Car } from './models';
import Promise from 'bluebird';
import fs from 'fs';

const header = 'Link,Modelo,Preco \n';

const toCsvFormat = (carList) => {
  return header + carList.reduce((acumulator, actual) => {
    return acumulator += actual.link + ',' + actual.fullName + ',' + actual.price + '\n';
  }, '');
}

const saveFile = (fileContent) => {
  return new Promise((resolve,reject) => {
    fs.writeFile("carros.csv", fileContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

const saveCars = (carList) => {
  const csv = toCsvFormat(carList);
  saveFile(csv);
}

module.exports = { toCsvFormat, saveCars };
