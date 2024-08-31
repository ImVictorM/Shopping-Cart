angular
  .module("core.layout.headerBase")
  .component("headerBase", {
    templateUrl: "app/core/layout/header-base/header-base.template.html",
    controller: [
      "$location", 
      "$rootScope", 
      "$scope",
      "$document",
      "Cart", 
      function ($location, $rootScope, $scope, $document, Cart) {
        const ctrl = this;

        ctrl.cartItemsQuantity = Cart.getItemsQuantity();
        ctrl.currentSectionTitle = getSectionTitle();
        ctrl.showCartOverview = false;
        ctrl.toggleCartOverview = toggleCartOverview;

        $rootScope.$on("cart:updated", function () {
          ctrl.cartItemsQuantity = Cart.getItemsQuantity();
        });

        $rootScope.$on('$locationChangeSuccess', function () {
          ctrl.currentSectionTitle = getSectionTitle();
        });

        $scope.$watch(function() { return ctrl.showCartOverview; }, toggleBodyBlur);

        function toggleCartOverview() {
          ctrl.showCartOverview = !ctrl.showCartOverview;
        }

        function toggleBodyBlur (show) {
          const body = $document.find("body");

          if (show) {
            body.addClass("blur");
          } else {
            body.removeClass("blur");
          };
        }

        function getSectionTitle() {
          const locationRoot = $location.path().match(/\w+/);
          return locationRoot ? locationRoot[0] : "";
        }
    }],
  });