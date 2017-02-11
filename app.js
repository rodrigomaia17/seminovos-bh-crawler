import scraper from './src/scraper';
import exporter from './src/exporter';

scraper.fetchLinks(2)
  .then((carList) => {
    console.log('found '+carList.length);
    console.log(carList[0]);
    console.log('primeiro '+ carList[0].link)
    return exporter.saveCars(carList);
  }).then( () => {
    console.log('saved =)');
  }).catch( (err) => {
    console.log(err);
  });
