angular
  .module("app")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/checkout", {
        template: "<checkout/>"
      })
      .when("/products", {
        template: "<products/>",
      })
      .when("/products/:id", {
        template: "<product-details/>",
      })
      .when("/", {
        redirectTo: "/products",
      })
      .otherwise({
        redirectTo: "/products",
      });
  }]);