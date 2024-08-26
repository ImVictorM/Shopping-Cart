angular
  .module("cart")
  .service("Cart", [function () {
    const sv = this;

    sv.key = "cart";
    sv.cart = getLocalStorageState();
    sv.addProductToCart = addProductToCart;
    sv.removeProductFromCart = removeProductFromCart;
    sv.clearCart = clearCart;

    function findProduct(id) {
      return sv.cart.findIndex(product => product.id === id);
    }

    function addProductToCart(product) {
      const productIndex = findProduct(product.id);

      if (productIndex !== -1) {
        sv.cart[productIndex].quantity += 1;
      } else {
        sv.cart.push({
          ...product, 
          quantity: 1
        });
      }
    
      updateLocalStorage(sv.cart);
    }

    function removeProductFromCart(id) {
      const productIndex = findProduct(product.id);
      if (productIndex === -1) return;

      if (sv.cart[productIndex].quantity > 1) {
        sv.cart[productIndex].quantity -= 1;
      } else {
        sv.cart = sv.cart.filter(product => product.id !== id);
      }
      
      updateLocalStorage(sv.cart);
    }

    function clearCart() {
      sv.cart = [];
      updateLocalStorage([]);
    }

    function updateLocalStorage(value) {
      localStorage.setItem(sv.key, JSON.stringify(value));
    }

    function getLocalStorageState() {
      const cart = localStorage.getItem(sv.key);

      if (cart) {
        return JSON.parse(cart);
      }

      return []
    };
  }]);