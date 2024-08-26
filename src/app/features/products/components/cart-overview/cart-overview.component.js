angular
  .module("features.products.cartOverview")
  .component("cartOverview", {
    templateUrl: "app/features/products/components/cart-overview/cart-overview.template.html",
    controller: ["$rootScope", "$window", "Cart", function ($rootScope, $window, Cart) {
      const ctrl = this;

      ctrl.products = Cart.cart;
      ctrl.total = Cart.getTotal();
      ctrl.scrolledDown = false;

      $rootScope.$on("cart:updated", function () {
        ctrl.total = Cart.getTotal();
      });

      function checkScrollPosition() {
        ctrl.scrolledDown = $window.scrollY > 60;
        $rootScope.$apply();
      }

      angular.element($window).on("scroll", checkScrollPosition);

      ctrl.$onDestroy = function () {
        angular.element($window).off("scroll", checkScrollPosition);
      };
    }]
  });