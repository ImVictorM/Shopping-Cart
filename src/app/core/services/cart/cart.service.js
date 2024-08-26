angular
  .module("cart")
  .service("Cart", ["$rootScope", function ($rootScope) {
    const sv = this;

    sv.key = "cart";
    sv.cart = getLocalStorageState();
    sv.addProductToCart = addProductToCart;
    sv.removeProductFromCart = removeProductFromCart;
    sv.clearCart = clearCart;
    sv.getTotal = getTotal;
    sv.getItemsQuantity = getItemsQuantity;

    function findProduct(id) {
      return sv.cart.findIndex(product => product.id === id);
    }

    function addProductToCart(product) {
      const productIndex = findProduct(product.id);
      const productPrice = Number(product.price.replace(",", "."));

      if (productIndex !== -1) {
        sv.cart[productIndex].quantity += 1;
        sv.cart[productIndex].subtotal = (Number(sv.cart[productIndex].subtotal.replace(",", ".")) + productPrice).toFixed(2).replace(".", ",");
      } else {
        sv.cart.push({
          ...product,
          quantity: 1,
          subtotal: productPrice.toFixed(2).replace(".", ",")
        });
      }
    
      updateLocalStorage(sv.cart);
      notifyCartUpdated();
    }

    function removeProductFromCart(id) {
      const productIndex = findProduct(product.id);
      if (productIndex === -1) return;

      const productPrice = Number(sv.cart[productIndex].price.replace(",", "."));

      if (sv.cart[productIndex].quantity > 1) {
        sv.cart[productIndex].quantity -= 1;
        sv.cart[productIndex].subtotal = (Number(sv.cart[productIndex].subtotal.replace(",", ".")) - productPrice).toFixed(2).replace(".", ",");
      } else {
        sv.cart = sv.cart.filter(product => product.id !== id);
      }
      
      updateLocalStorage(sv.cart);
      notifyCartUpdated();
    }

    function clearCart() {
      sv.cart = [];
      updateLocalStorage([]);
      notifyCartUpdated();
    }

    function getTotal() {
      return sv.cart.reduce((total, item) => {

        return total + Number(item.subtotal.replace(",", "."));
      }, 0);
    }

    function getItemsQuantity() {
      return sv.cart.reduce((quantity, item) => {
        return quantity + item.quantity;
      }, 0);
    }

    function updateLocalStorage(value) {
      localStorage.setItem(sv.key, JSON.stringify(value));
    }

    function notifyCartUpdated() {
      $rootScope.$broadcast("cart:updated");
    }

    function getLocalStorageState() {
      const cart = localStorage.getItem(sv.key);

      if (cart) {
        return JSON.parse(cart);
      }

      return []
    };
  }]);