import scraper from '../src/scraper';
import { Car } from '../src/models';

describe('scraper', () => {
	beforeEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});

	test.skip('Fetch initial car', (done) => {
		scraper.fetchLinks(1).then((links) => {
      expect(links instanceof Array).toBeTruthy();
      expect(links[0] instanceof Car).toBeTruthy();
			expect(links[0].link.includes('/veiculo/codigo')).toBeTruthy();
      done();
		})
	})

	test.skip('Fetch initial cars from several pages from Seminovos', (done) => {
		scraper.fetchLinks(2).then((links) => {
      expect(links instanceof Array).toBeTruthy();
      expect(links[0] instanceof Car).toBeTruthy();
			expect(links[0].link.includes('/veiculo/codigo')).toBeTruthy();
      done();
		});
	})

	test('can parse one car attributes', () => {
		const car = scraper.extractCar(singleCar);

    expect(car instanceof Car ).toBeTruthy();
    expect(car.link).toBe('https://www.seminovosbh.com.br/veiculo/codigo/2015484');
    expect(car.fullName).toBe('Fiat Palio 1.0 8V FIRE ECONOMY' );
    expect(car.price).toBe(18500);
    expect(car.year).toBe(2012);
    expect(car.km).toBe(78000);
	});

  test('can format numbers', () => {
    expect(scraper.formatPrice(' R$ 23.110,00')).toBe(23110);
  })
});




const singleCar = `<dt>
<a href="/veiculo/codigo/2015484" title="Clique para visualizar"><img src="http://tcarros.seminovosbh.com.br/mini_fiat-palio-2012-2012-2015484-2859a74d68c65bc9ef3c39dc9d129e17f9c1.jpg" alt="Fiat Palio 1.0 8V FIRE ECONOMY"></a>
</dt>

<dd class="titulo-busca"><h4>Fiat Palio 1.0 8V FIRE ECONOMY <span class="preco_busca"> R$ 18.500,00 </span></h4></dd>
<div class="bg-nitro-mais-home">
<dd class="btn_comparar"><a onclick="compararInserir(2015484, &apos;Fiat Palio 1.0 8V FIRE ECONOMY&apos;, &apos;http://tcarros.seminovosbh.com.br/mini_fiat-palio-2012-2012-2015484-2859a74d68c65bc9ef3c39dc9d129e17f9c1.jpg&apos;);"><img src="/images/icon_comparar.png" align="absmiddle"> Comparar</a></dd>                <dd class="planoNitroHomeDesc"><p>2012/2012</p>
<p>
78000 Km                    </p>
</dd>
<dd class="planoNitroHomeDesc">
<p>4 Portas</p>
<p>Vermelho</p></dd>
<dd class="planoNitroHomeDesc"><p>Bi-Combust&#xED;vel</p><span>N&#xE3;o Aceita Troca</span></dd>

<dd class="list-acessorios">
<span>ALARME</span><span>DESEMBA&#xC7;ADOR</span><span>FAR&#xD3;IS DE MILHA</span><span>LIMPADOR TRASEIRO</span><span>MP3 / USB</span><span>TRAVAS EL&#xC9;TRICAS</span>
</dd>
<div style="clear:both"></div>
</div>
`;
