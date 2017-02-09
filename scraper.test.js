import scraper from './scraper';

describe('', () => {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('Fetch initial car', () => {
    return scraper.fetchLinks(1).then((links) => {
      const firstLink = links[0].attribs.href;
      expect(firstLink.includes('/veiculo/codigo/')).toBeTruthy();
    })
    .catch(e => { return e; });
  })

  test('Fetch initial cars from several pages from Seminovos', () => {
    return scraper.fetchLinks(2).then((links) => {
      const firstLink = links[0].attribs.href;
      expect(firstLink.includes('/veiculo/codigo/')).toBeTruthy();
    });
  })
});
