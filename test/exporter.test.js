import exporter from '../src/exporter';
import { Car } from '../src/models';


describe('exporter', () => {
  test('can create CSV from Car', () => {
    const car = new Car('a', 'b', 1);

    const result = exporter.toCsvFormat([car]);

    const expected = 'Link,Modelo,Preco \na,b,1\n';

    expect(result).toEqual(expected);
  });
});
