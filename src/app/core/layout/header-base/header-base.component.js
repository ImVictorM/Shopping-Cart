angular
  .module("core.layout.headerBase")
  .component("headerBase", {
    templateUrl: "app/core/layout/header-base/header-base.template.html",
    controller: ["$location", "$rootScope", "Cart", function ($location, $rootScope, Cart) {
      const ctrl = this;

      ctrl.cartItemsQuantity = Cart.getItemsQuantity();
      ctrl.currentSectionTitle = getSectionTitle();
      ctrl.toggleCartOverview = Cart.toggleCartOverview;

      $rootScope.$on("cart:updated", function () {
        ctrl.cartItemsQuantity = Cart.getItemsQuantity();
      });

      $rootScope.$on('$locationChangeSuccess', function () {
        ctrl.currentSectionTitle = getSectionTitle();
      });

      function getSectionTitle() {
        const locationRoot = $location.path().match(/\w+/);
        return locationRoot ? locationRoot[0] : "";
      }
    }],
  });