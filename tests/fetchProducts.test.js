require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('testa se a função fetch foi chamada na execução de fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  it('testa se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const expectedEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toBeCalledWith(expectedEndpoint);
  });

  it('testa se a função fetchProducts está retornando a estrutura esperada', async () => {
    const received = await fetchProducts('computador');
    expect(received).toEqual(computadorSearch);
  });

  it('testa se a função cria um objeto de erro quando não é passado argumento', async () => {
    const received = await fetchProducts();
    expect(received).toEqual(new Error('You must provide an url'));
  });
});
