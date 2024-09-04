angular
  .module("shared.utils.discount")
  .factory("DiscountUtils", [function () {
    function checkIfHasDiscount(basePrice, currentPrice) {
      return basePrice && currentPrice && basePrice > currentPrice;
    }

    function calculateDiscount(basePrice, currentPrice) {
      if (!checkIfHasDiscount(basePrice, currentPrice)) return;

      return Math.round((basePrice - currentPrice) * 100 / basePrice);
    }

    return {
      checkIfHasDiscount,
      calculateDiscount,
    }
  }]);