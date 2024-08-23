angular
  .module("features.products")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "app/features/products/views/products.view.html",
    })
  }]);
