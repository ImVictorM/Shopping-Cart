angular.module("features.products", [
  "ngRoute",
  "features.products.components.productList",
  "features.products.components.cartOverview",
  "features.products.components.productDetails",
  "features.products.services.MercadoLivre",
  "features.products.filters.stock",
]);