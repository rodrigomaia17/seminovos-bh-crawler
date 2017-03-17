import Promise from 'bluebird';
import fs from 'fs';


const toCsvFormat = (carList) => {
  if (carList.length < 1) throw new Error('empty list');
  const header = `${Object.keys(carList[0]).join(',')}\n`;
  const csv = header + carList.reduce((acumulator, actual) => (
    `${acumulator}${Object.values(actual).join(',')}\n`
  ), '');
  return csv;
};

const toJSON = carList => JSON.stringify(carList);

const saveFile = (fileContent, fileName) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, fileContent, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const saveCarsToCSV = (carList) => {
  const csv = toCsvFormat(carList);
  return saveFile(csv, 'cars.csv');
};

const saveCarsToJSON = (carList) => {
  const file = toJSON({ cars: carList });
  return saveFile(file, 'cars.json');
};

module.exports = { toJSON, toCsvFormat, saveCarsToCSV, saveCarsToJSON };
