angular
  .module("features.products.views.products")
  .component("products", {
    templateUrl: "src/app/features/products/views/products/products.template.html",
    controller: [
      "MercadoLivreAPI",
      "DiscountUtils",
      function ProductsController(MercadoLivreAPI, DiscountUtils) {
        const ctrl = this;

        ctrl.loading = true;
        ctrl.products = [];

        MercadoLivreAPI
          .getProductsByType("computer")
          .then((response) => {
       
            ctrl.products = response.results.map((p) => ({
              seller: {
                id: p.seller.id,
                name: p.seller.nickname,
              },
              id: p.id,
              title: p.title,
              price: p.price,
              thumbnail: p.thumbnail,
              hasDiscount: DiscountUtils.checkIfHasDiscount(p.original_price, p.price),
              discountPercentage: DiscountUtils.calculateDiscount(p.original_price, p.price),
            }));
            
            ctrl.loading = false;
        });
      },
    ]
  });