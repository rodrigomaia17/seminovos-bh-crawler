import exporter from '../src/exporter';
import { Car } from '../src/models';


describe('exporter', () => {
  test('can create CSV from Car', () => {
    const car = new Car('a', 'b', 1, 2010, 10000);

    const result = exporter.toCsvFormat([car]);

    const expected = 'link,fullName,price,year,km\na,b,1,2010,10000\n';

    expect(result).toEqual(expected);
  });
});
