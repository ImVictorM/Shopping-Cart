require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('testa se a função fetch foi chamada na execução de fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('testa se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const expectedEndpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(expectedEndpoint);
  });

  it('testa se a função fetchItem está retornando a estrutura esperada', async () => {
    const received = await fetchItem('MLB1615760527');
    expect(received).toEqual(item);
  });

  it('testa se a função cria um objeto de erro quando não é passado argumento', async () => {
    const received = await fetchItem();
    expect(received).toEqual(new Error('You must provide an url'));
  });
});
