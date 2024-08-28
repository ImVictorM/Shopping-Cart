angular
  .module("features.products.components.cartOverview")
  .component("cartOverview", {
    templateUrl: "app/features/products/components/cart-overview/cart-overview.template.html",
    controller: ["$rootScope", "Cart", function ($rootScope, Cart) {
      const ctrl = this;

      ctrl.products = Cart.cart;
      ctrl.clearCart = Cart.clearCart;
      ctrl.total = Cart.getTotal();
      ctrl.isCartEmpty = checkIsCartEmpty();

      $rootScope.$on("cart:updated", function () {
        ctrl.total = Cart.getTotal();
        ctrl.products = Cart.cart;
        ctrl.isCartEmpty = checkIsCartEmpty();
      });

      function checkIsCartEmpty() {
        return Cart.cart.length === 0;
      }
    }]
  });