angular
  .module("features.products.productList")
  .component("productList", {
    templateUrl: "app/features/products/components/product-list/product-list.template.html",
    controller: [
      "MercadoLivreAPI",
      function ProductListController(MercadoLivreAPI) {
        const ctrl = this;
        ctrl.test = "sim"
        ctrl.loading = true;
        ctrl.products = [];

        MercadoLivreAPI.getProductsByType("computer").then(response => {
          ctrl.products = response.results.map((p) => ({
            title: p.title,
            price: p.price.toFixed(2).replace(".", ","),
            thumbnail: p.thumbnail,
          }));
          
          ctrl.loading = false;
        });
      }
    ],
  })