angular.module("features.products.views.productDetails", [
  "ngRoute",
  "features.products.services.MercadoLivre",
  "shared.filters.brlCurrencyFilter",
  "shared.utils.discount",
  "features.products.filters.stock",
  "core.services.cart",
]);