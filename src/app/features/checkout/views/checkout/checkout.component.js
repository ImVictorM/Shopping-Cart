angular
  .module("features.checkout.views.checkout")
  .component("checkout", {
    templateUrl: "app/features/checkout/views/checkout/checkout.template.html",
    controller: [
      "$rootScope", 
      "$scope", 
      "Cart", 
      "ViaCep",
      function CheckoutController($rootScope, $scope, Cart, ViaCep) {
        const ctrl = this;

        ctrl.products = Cart.cart;
        ctrl.totalAmount = Cart.getTotal();

        ctrl.orderAddress = {
          zipCode: {
            value: "",
            isValid: false,
            validationFunction: (value) => value && value.length === 8,
            notValidMessage: "Zip Code must have length of 8",
          },
          street: {
            value: "",
            isValid: false,
            validationFunction: (value) => !!value,
            notValidMessage: "Street is required",
          },
          neighborhood: {
            value: "",
            isValid: false,
            validationFunction: (value) => !!value,
            notValidMessage: "Neighborhood is required",
          },
          city: {
            value: "",
            isValid: false,
            validationFunction: (value) => !!value,
            notValidMessage: "City is required",
          },
          state: {
            value: "",
            isValid: false,
            validationFunction: (value) => !!value,
            notValidMessage: "State is required",
          },
          complement: {
            value: "",
            isValid: true,
          },
        }

        ctrl.isOrderFormValid = false;
        ctrl.isOrderFormBlank = true;
        
        ctrl.clearCart = Cart.clearCart;

        ctrl.removeProduct = function (id) {
          Cart.removeProductFromCart(id, true);
        }
        ctrl.decreaseQuantity = function (id) {
          Cart.removeProductFromCart(id);
        }
        ctrl.increaseQuantity = function (product) {
          console.log(product)
          Cart.addProductToCart(product);
        }

        // limit zip code to only numbers
        $scope.$watch(
          () => ctrl.orderAddress.zipCode.value,
          (newValue, oldValue) => {
            if (/\D+/g.test(newValue) && newValue !== "") {
              ctrl.orderAddress.zipCode.value = oldValue;
            } else {
              ctrl.orderAddress.zipCode.value = newValue;
            }
          }
        );

        // make call to address service when zip code is complete
        $scope.$watch(
          () => ctrl.orderAddress.zipCode.value,
          (zipCode) => {
            if (zipCode.length !== 8) return;

            ViaCep
              .getAddressByZipCode(zipCode)
              .then((response) => {
                ctrl.orderAddress.zipCode.value = zipCode;
                ctrl.orderAddress.street.value = response.street;
                ctrl.orderAddress.neighborhood.value = response.neighborhood;
                ctrl.orderAddress.city.value = response.city;
                ctrl.orderAddress.state.value = response.state;
                ctrl.orderAddress.complement.value =  response.complement;
              });
          }
        );

        $scope.$watchCollection(
          () => ({
            zipCode: ctrl.orderAddress.zipCode.value,
            street: ctrl.orderAddress.street.value,
            neighborhood: ctrl.orderAddress.neighborhood.value,
            city: ctrl.orderAddress.city.value,
            state: ctrl.orderAddress.state.value,
            complement: ctrl.orderAddress.complement.value,
          }),
          (newValues) => {
            // validate each field individually
            Object.entries(newValues).forEach(([key, value]) => {
              const field = ctrl.orderAddress[key];
              if (!field.validationFunction || !field) return;

              field.isValid = field.validationFunction(value);
            });

            // validate form
            const addressData = Object.values(ctrl.orderAddress);
            ctrl.isOrderFormValid = addressData.every(address => address.isValid);
            ctrl.isOrderFormBlank = addressData.every(address => address.value === "");
          },
        );
    
        $rootScope.$on("cart:updated", function () {
          ctrl.products = Cart.cart;
          ctrl.totalAmount = Cart.getTotal();
        });
      }
    ],
  });