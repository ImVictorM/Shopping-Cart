angular
  .module("features.products.views.productDetails")
  .component("productDetails", {
    templateUrl: "app/features/products/views/product-details/product-details.template.html",
    controller: [
      "$routeParams", 
      "MercadoLivreAPI",
      "Cart",
      function ProductDetailsController($routeParams, MercadoLivreAPI, Cart) {
        const ctrl = this;

        ctrl.product = null;
        ctrl.loading = true;
        ctrl.changeCurrentImage = changeCurrentImage;
        ctrl.addToCart = addToCart;

        MercadoLivreAPI
          .getProductById($routeParams.id)
          .then((response) => {
            const images = response.pictures.map(picture => picture.url);

            ctrl.product = {
              id: response.id,
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
              hasDiscount: checkIfHasDiscount(response.original_price, response.price),
              discountPercentage: calculateDiscount(response.original_price, response.price),
            };

            ctrl.loading = false;
          });

        function changeCurrentImage(image) {
          ctrl.product.currentImage = image;
        }

        function addToCart() {
          if (!ctrl.product) return;
          
          Cart.addProductToCart({
            id: ctrl.product.id,
            title: ctrl.product.title,
            price: ctrl.product.price,
            thumbnail: ctrl.product.thumbnail,
          });
        }

        function checkIfHasDiscount(basePrice, currentPrice) {
          return basePrice && currentPrice && basePrice > currentPrice;
        }

        function calculateDiscount(basePrice, currentPrice) {
          if (!checkIfHasDiscount(basePrice, currentPrice)) return;

          return Math.round((basePrice - currentPrice) * 100 / basePrice);
        }
    }],
  });