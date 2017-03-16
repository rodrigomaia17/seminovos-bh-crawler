import exporter from '../src/exporter';
import Car from '../../models/Car.js';


describe('exporter', () => {
  test('can create CSV from Car', () => {
    const car = new Car('a', 'b', 1, 2010, 10000);

    const result = exporter.toCsvFormat([car]);

    const expected = 'link,fullName,price,year,km\na,b,1,2010,10000\n';

    expect(result).toEqual(expected);
  });


  test('can create JSON from Car', () => {
    const car = new Car('a', 'b', 1, 2010, 10000);

    const result = exporter.toJSON([car]);

    const expected = "[{\"link\":\"a\",\"fullName\":\"b\",\"price\":1,\"year\":2010,\"km\":10000}]";

    expect(result).toEqual(expected);
  });
});
