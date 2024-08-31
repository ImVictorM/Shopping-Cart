angular
  .module("core.layout.headerBase")
  .component("headerBase", {
    templateUrl: "app/core/layout/header-base/header-base.template.html",
    controller: [
      "$location", 
      "$rootScope", 
      "$scope",
      "$window",
      "$document",
      "Cart", 
      function ($location, $rootScope, $scope, $window, $document, Cart) {
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
          handleMenuVisibility();
        });

        $scope.$watch(function() { return ctrl.showCartOverview; }, toggleBodyBlur);

        handleMenuVisibility();

        angular.element($window).on("resize", handleMenuVisibility);

        function handleMenuVisibility() {
          const headerMenu = $document[0].querySelector(".header__menu");

          if ($window.innerWidth > 1200 && $location.path() === "/products") {
            if (headerMenu) {
              headerMenu.style.display = "none";
            }
            
            if (!$rootScope.$$phase && !$scope.$$phase) {
              $scope.$apply(function () {
                ctrl.showCartOverview = false;
              });
            } else {
              ctrl.showCartOverview = false;
            }
          } else {
            if (headerMenu) {
              headerMenu.style.display = "flex";
            }
          }
        }

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