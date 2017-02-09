import request from 'request-promise';
import cheerio from 'cheerio';

const fecthLinksFromPage = (pageNumber) => {
  const url = 'https://www.seminovosbh.com.br/resultadobusca/index/usuario/todos/ordenar/plano/ordem/DESC/qtdpag/50/pagina/'+pageNumber;

  return request(url)
    .then((html) => {
      return extractCarLinksFromPage(html);
    });
}

const extractTotalNumberOfPages = (html) => {
  const $ = cheerio.load(html);
  return $('strong.total').text();
}

const extractCarLinksFromPage = (html) => {
  const $ = cheerio.load(html);
  return $('dt a').toArray();
}

const fetchLinks = (maxPages) => {
  const initialUrl = 'https://www.seminovosbh.com.br/resultadobusca/index/usuario/todos/ordenar/plano/ordem/DESC/qtdpag/50/';

  return request(initialUrl)
    .then((html) => {
      return extractTotalNumberOfPages(html);
    })
  .then((numberPages) => {
    if (maxPages && maxPages < numberPages){
      numberPages = maxPages;
    }

    console.log('fetching '+numberPages+' pages');
    const promisesQueue = [];
    for (let i = 1; i <= numberPages; i++){
      promisesQueue.push(fecthLinksFromPage(i))
    }
    return Promise.all(promisesQueue);
  })
  .then((listOfListOfLinks) => {
    return [].concat.apply([], listOfListOfLinks);
  })
}

module.exports = { fetchLinks }
