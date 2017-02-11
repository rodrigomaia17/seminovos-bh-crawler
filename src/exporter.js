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

const saveFile = fileContent => new Promise((resolve, reject) => {
  fs.writeFile('carros.csv', fileContent, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const saveCars = (carList) => {
  const csv = toCsvFormat(carList);
  saveFile(csv);
};

module.exports = { toCsvFormat, saveCars };
