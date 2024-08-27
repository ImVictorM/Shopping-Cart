angular
  .module("core.services.headerBase")
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

      if (productIndex !== -1) {
        sv.cart[productIndex].quantity += 1;
        sv.cart[productIndex].subtotal += product.price;
      } else {
        sv.cart.push({
          ...product,
          quantity: 1,
          subtotal: product.price
        });
      }
    
      updateLocalStorage(sv.cart);
      notifyCartUpdated();
    }

    function removeProductFromCart(id) {
      const productIndex = findProduct(product.id);
      if (productIndex === -1) return;

      if (sv.cart[productIndex].quantity > 1) {
        sv.cart[productIndex].quantity -= 1;
        sv.cart[productIndex].subtotal -= sv.cart[productIndex].price;
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

        return total + item.subtotal;
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