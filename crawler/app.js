/* eslint no-console: 0 */
import scraper from './src/scraper';
import exporter from './src/exporter';

scraper.fetchLinks()
  .then((carList) => {
    console.log(`found ${carList.length}`);
    return exporter.saveCarsToJSON(carList);
  }).then(() => {
    console.log('saved =)');
  }).catch((err) => {
    console.log(err);
  });
