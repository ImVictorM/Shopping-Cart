angular
  .module("features.products.productList")
  .component("productList", {
    templateUrl: "app/features/products/components/product-list/product-list.template.html",
    controller: [
      "MercadoLivreAPI",
      "Cart",
      function ProductListController(MercadoLivreAPI, Cart) {
        const ctrl = this;
        ctrl.test = "sim"
        ctrl.loading = true;
        ctrl.products = [];

        ctrl.add = function (product) {
          Cart.addProductToCart(product);
        }

        MercadoLivreAPI.getProductsByType("computer").then(response => {
          console.log(response.results)
          ctrl.products = response.results.map((p) => ({
            seller: {
              id: p.seller.id,
              name: p.seller.nickname,
            },
            id: p.id,
            title: p.title,
            price: p.price,
            thumbnail: p.thumbnail,
          }));
          
          ctrl.loading = false;
        });
      }
    ],
  })