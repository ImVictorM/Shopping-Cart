angular
  .module("app")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/checkout", {
        template: "<h1>hello</h1>"
      })
      .when("/products", {
        template: "<products/>",
      })
      .when("/products/:id", {
        templateUrl: "app/features/products/views/product-details/product-details.template.html",
      })
      .when("/", {
        redirectTo: "/products",
      })
      .otherwise({
        redirectTo: "/products",
      });
  }]);