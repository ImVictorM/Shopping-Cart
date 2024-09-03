angular
  .module("features.checkout.services.viaCep")
  .factory("ViaCep", ["$http", function ($http) {
    return {
      getAddressByZipCode: function (zipCode) {
        return $http
          .get(`https://viacep.com.br/ws/${zipCode}/json/`)
          .then(({ data }) => {
            
            return {
              zipCode: data.cep,
              street: data.logradouro, 
              neighborhood: data.bairro,
              city: data.uf,
              state: data.estado,
              complement: data.complemento,
            };
          })
          .catch(error => {
            error.message = `Error trying to get address for zip code ${zipCode}`;
            
            console.error(error);
            throw error;
          });
      },
    }
  }]);