const fetchItem = async (itemId) => {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
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
    fetchItem,
  };
}
