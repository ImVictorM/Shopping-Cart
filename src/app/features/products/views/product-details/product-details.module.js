angular.module("features.products.views.productDetails", [
  "ngRoute",
  "features.products.services.MercadoLivre",
  "shared.filters.brlCurrencyFilter",
  "features.products.filters.stock",
  "core.services.cart",
]);