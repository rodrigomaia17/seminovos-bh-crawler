import { Car } from './models';
import Promise from 'bluebird';
import fs from 'fs';


const toCsvFormat = (carList) => {
  if (carList.length < 1) throw new Error('empty list');
  const header = Object.keys(carList[0]).join(',') + '\n';
  return header + carList.reduce((acumulator, actual) => {
    return acumulator += Object.values(actual).join(',') + '\n';
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
