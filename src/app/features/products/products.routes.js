angular
  .module("features.products")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/products", {
      templateUrl: "app/features/products/views/products/products.template.html",
    })
  }]);
