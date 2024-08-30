angular
  .module("features.products.views.products")
  .component("products", {
    templateUrl: "app/features/products/views/products/products.template.html",
    controller: [
      "MercadoLivreAPI",
      function ProductsController(MercadoLivreAPI) {
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
              availableQuantity: p.available_quantity,
            }));
            
            ctrl.loading = false;
        });
      },
    ]
  });