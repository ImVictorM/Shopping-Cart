angular
  .module("core.services.cart")
  .service("Cart", ["$rootScope", function ($rootScope) {
    const sv = this;

    sv.key = "cart";
    sv.cart = getLocalStorageState();
    sv.addProductToCart = addProductToCart;
    sv.removeProductFromCart = removeProductFromCart;
    sv.clearCart = clearCart;
    sv.getTotal = getTotal;
    sv.getItemsQuantity = getItemsQuantity;
    sv.checkIsCartEmpty = checkIsCartEmpty;
    
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

    function removeProductFromCart(id, force = false) {
      const productIndex = findProduct(id);
      if (productIndex === -1) return;

      if (sv.cart[productIndex].quantity > 1 && !force) {
        sv.cart[productIndex].quantity -= 1;
        sv.cart[productIndex].subtotal -= sv.cart[productIndex].price;
      } else {
        sv.cart.splice(productIndex, 1);
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

    function checkIsCartEmpty() {
      return sv.cart.length === 0;
    }
  }]);