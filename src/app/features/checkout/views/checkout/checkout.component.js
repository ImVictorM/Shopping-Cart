angular
  .module("features.checkout.views.checkout")
  .component("checkout", {
    templateUrl: "app/features/checkout/views/checkout/checkout.template.html",
    controller: ["$rootScope", "Cart", function CheckoutController($rootScope, Cart) {
      const ctrl = this;

      ctrl.products = Cart.cart;
      ctrl.totalAmount = Cart.getTotal();

      $rootScope.$on("cart:updated", function () {
        ctrl.products = Cart.cart;
        ctrl.totalAmount = Cart.getTotal();
      });

      console.log(ctrl.products)
    }],
  });