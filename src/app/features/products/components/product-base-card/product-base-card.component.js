angular
  .module("features.products.components.productBaseCard")
  .component("productBaseCard", {
    bindings: {
      product: "<",
    },
    templateUrl: "app/features/products/components/product-base-card/product-base-card.template.html",
    controller: [
      "$window",
      "Cart",
      "MercadoLivreAPI",
      function ProductBaseCardController($window, Cart, MercadoLivreAPI) {
        const ctrl = this;

        ctrl.addToCart = function () {
          if (!ctrl.product) return;

          MercadoLivreAPI
            .getProductById(ctrl.product.id)
            .then((response) => {
              if (response.status === "active") {
                Cart.addProductToCart(ctrl.product);
              } else {
                $window.alert(`The product ${ctrl.product.title} is not available in this moment`);
              }
            });
        };
      }
    ],
  })