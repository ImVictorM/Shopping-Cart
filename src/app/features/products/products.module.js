angular.module("features.products", [
  "ngRoute",
  "features.products.components.productBaseCard",
  "shared.components.cartOverview",
  "features.products.views.productDetails",
  "features.products.views.products",
  "features.products.services.MercadoLivre",
  "features.products.filters.stock",
]);