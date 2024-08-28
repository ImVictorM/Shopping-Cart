angular
  .module("app")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        redirectTo: "/products",
      })
      .otherwise({
        redirectTo: "/",
      });
  }]);