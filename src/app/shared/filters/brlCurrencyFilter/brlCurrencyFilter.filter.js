angular
  .module("shared.brlCurrencyFilter")
  .filter("brlCurrencyFilter", [function () {
    return function (input) {
      return input.toLocaleString("pt-br", { 
        style: "currency", 
        currency: "BRL"
      });
    };
  }]);