angular
  .module("features.products.services.MercadoLivre")
  .factory("MercadoLivreAPI", ["$http", function($http) {
    const domain = "https://api.mercadolibre.com";

    return {
      getProductsByType: function (type) {
        const endpoint = `${domain}/sites/MLB/search?q=${type}`;
    
        return $http
          .get(endpoint)
          .then((response) => {
            return response.data
          })
          .catch((error) => {
            error.message = `Error fetching products by type ${type}`;
  
            console.error(error);
            throw error;
          });
      },
      getProductById: function (id) {
        const endpoint = `${domain}/items/${id}`;

        return $http
          .get(endpoint)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            error.message = `Error fetching product of id ${id}`;
  
            console.error(error);
            throw error;
          });
      },
      getSellerById: function (id) {
        const endpoint = `${domain}/users/${id}`;

        return $http
          .get(endpoint)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            error.message = `Error fetching seller of id ${id}`;

            console.error(error);
            throw error;
          });
      }
    }
  }]);