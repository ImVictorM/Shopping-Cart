angular
  .module("features.products.components.productBaseCard")
  .component("productBaseCard", {
    bindings: {
      product: "<",
    },
    templateUrl: "app/features/products/components/product-base-card/product-base-card.template.html",
    controller: [
      "Cart",
      function ProductBaseCardController(Cart) {
        const ctrl = this;

        ctrl.addToCart = function () {
          if (!ctrl.product) return;

          Cart.addProductToCart(ctrl.product);
        };
      }
    ],
  })