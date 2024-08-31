angular
  .module("core.layout.headerBase")
  .directive("headerMenuVisibility", [
    "$location",
    "$window",
    function ($location, $window) {
      return {
        restrict: "A", // only match attr names,
        link: function (scope, element) {
          handleMenuVisibility();
          
          angular.element($window).on("resize", handleMenuVisibility);

          scope.$on('$locationChangeSuccess', function () {
            handleMenuVisibility();
          });

          scope.$on("$destroy", function () {
            angular.element($window).off("resize", handleMenuVisibility);
          });
  
          function handleMenuVisibility() {
            const headerMenu = element[0];
  
            if ($window.innerWidth > 1200 && $location.path() === "/products") {
              headerMenu.style.display = "none";
          
              if (!scope.$$phase && !scope.$root.$$phase) {
                scope.$apply(function () {
                  scope.$ctrl.showCartOverview = false;
                });
              } else {
                scope.$ctrl.showCartOverview = false;
              }
            } else {
              headerMenu.style.display = "flex";
            }
          }
        }
      }
    }
  ]);