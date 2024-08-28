angular
  .module("core.layout.headerBase")
  .component("headerBase", {
    templateUrl: "app/core/layout/header-base/header-base.template.html",
    controller: ["$rootScope", "Cart", function ($rootScope, Cart) {
      const ctrl = this;

      ctrl.cartItemsQuantity = Cart.getItemsQuantity();

      $rootScope.$on("cart:updated", function () {
        ctrl.cartItemsQuantity = Cart.getItemsQuantity();
      });
    }],
  });