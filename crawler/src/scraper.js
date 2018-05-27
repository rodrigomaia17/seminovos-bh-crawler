import request from 'request-promise';
import cheerio from 'cheerio';
import numeral from 'numeral';
import _ from 'lodash';

import Car from '../../models/Car.js';

const formatPrice = (fullPrice) => {
  const tempString = fullPrice.trim().replace('R$', '').replace('.', '');
  return numeral(tempString.substring(0, tempString.length - 3)).value();
};

const extractTotalNumberOfPages = (html) => {
  const $ = cheerio.load(html);
  return $('strong.total').text();
};

const extractCar = (html) => {
  const $ = cheerio.load(html);
  const link = $('dt a')[0].attribs.href;
  const fullName = $('img')[0].attribs.alt;
  const price = $('.preco_busca').text();
  const year = Number($('dd p').first().text().split('/')[0]);
  const km = Number($('dd p').eq(1).text().replace('Km', '')
    .trim());
  return new Car(
    `https://www.seminovosbh.com.br${link}`,
    fullName.replace(',', ''),
    formatPrice(price),
    year,
    km,
  );
};

const extractCarFromSearch = (html) => {
  const $ = cheerio.load(html);
  const cars = [];
  $('.bg-busca').each((index, el) => {
    const car = extractCar($(el).html());
    cars.push(car);
  });
  return cars;
};

const fecthLinksFromPage = (pageNumber) => {
  const url = `https://www.seminovosbh.com.br/resultadobusca/index/usuario/todos/cidade/2700/ordenar/plano/ordem/DESC/qtdpag/50/pagina/${pageNumber}`;

  return request(url)
    .then(html => extractCarFromSearch(html));
};

const fetchLinks = (maxPages) => {
  const initialUrl = 'https://www.seminovosbh.com.br/resultadobusca/index/usuario/todos/cidade/2700/ordenar/plano/ordem/DESC/qtdpag/50/';

  return request(initialUrl)
    .then(html => extractTotalNumberOfPages(html))
  .then((numberPages) => {
    let pages = numberPages;
    if (maxPages && maxPages < pages) {
      pages = maxPages;
    }

    const promisesQueue = [];
    for (let i = 1; i <= pages; i += 1) {
      promisesQueue.push(fecthLinksFromPage(i));
    }
    return Promise.all(promisesQueue);
  })
  .then(listOfListOfLinks => _.flattenDeep(listOfListOfLinks));
};

module.exports = { fetchLinks, extractCar, formatPrice };
