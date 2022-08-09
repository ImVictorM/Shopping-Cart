const fetchProducts = async (productType) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${productType}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    error.message = 'You must provide an url';
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
