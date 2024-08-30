angular
  .module("features.products.filters.stock")
  .filter("stock", [function () {
    return function (input) {
      if (!input) return;
  
      switch (input.toLowerCase()) {
        case "active":
          return "In stock";
        default:
          return "Out of stock";
      }
    };
  }]);