angular
  .module("features.products.views.productDetails")
  .component("productDetails", {
    templateUrl: "app/features/products/views/product-details/product-details.template.html",
    controller: [
      "$routeParams",
      "$rootScope",
      "$scope",
      "DiscountUtils",
      "MercadoLivreAPI",
      "Cart",
      function ProductDetailsController($routeParams, $rootScope, $scope, DiscountUtils, MercadoLivreAPI, Cart) {
        const ctrl = this;

        ctrl.product = null;
        ctrl.seller = null;
        ctrl.loading = true;
        ctrl.changeCurrentImage = changeCurrentImage;
        ctrl.addToCart = addToCart;

        $rootScope.$on("cart:updated", function () {
          if (!ctrl.product) return;

          ctrl.product.quantityInCart = getProductQuantityInCart(ctrl.product.id);
        });

        $scope.$watch(() => ctrl.product ? ctrl.product.sellerId : null, function (sellerId) {
          if (sellerId) {
            MercadoLivreAPI
              .getSellerById(sellerId)
              .then(response => {
                ctrl.seller = {
                  address: response.address,
                  id: response.id,
                  name: response.nickname,
                  link: response.permalink,
                  reputation: response.seller_reputation,
                }
              });
          }
        });

        MercadoLivreAPI
          .getProductById($routeParams.id)
          .then((response) => {
            const images = response.pictures.map(picture => picture.url);
      
            ctrl.product = {
              id: response.id,
              sellerId: response.seller_id,
              thumbnail: response.thumbnail,
              currentImage: images[0],
              images: images,
              price: response.price,
              originalPrice: response.original_price,
              title: response.title,
              condition: response.condition,
              description: response.descriptions.join(", "),
              status: response.status,
              origin: response.permalink,
              hasDiscount: DiscountUtils.checkIfHasDiscount(response.original_price, response.price),
              discountPercentage: DiscountUtils.calculateDiscount(response.original_price, response.price),
              quantityInCart: getProductQuantityInCart(response.id),
            };

            ctrl.loading = false;
          });

        function changeCurrentImage(image) {
          ctrl.product.currentImage = image;
        }

        function getProductQuantityInCart(id) {
          const product = Cart.cart.find(product => product.id === id);
          if (!product) return;

          return product.quantity;
        }

        function addToCart() {
          if (!ctrl.product) return;
          
          Cart.addProductToCart({
            seller: {
              id: ctrl.seller.id,
              name: ctrl.seller.name,
            },
            id: ctrl.product.id,
            title: ctrl.product.title,
            price: ctrl.product.price,
            thumbnail: ctrl.product.thumbnail,
            hasDiscount: ctrl.product.hasDiscount,
            discountPercentage: ctrl.product.discountPercentage,
          });
        }
    }],
  });