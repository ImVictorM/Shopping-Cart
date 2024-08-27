angular
  .module("shared.filters.brlCurrencyFilter")
  .filter("brlCurrencyFilter", [function () {
    return function (input) {
      return input.toLocaleString("pt-br", { 
        style: "currency", 
        currency: "BRL"
      });
    };
  }]);