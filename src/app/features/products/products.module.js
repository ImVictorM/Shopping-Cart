angular.module("features.products", [
  "ngRoute",
  "features.products.components.productBaseCard",
  "features.products.components.cartOverview",
  "features.products.components.productDetails",
  "features.products.views.products",
  "features.products.services.MercadoLivre",
  "features.products.filters.stock",
]);