export const formatPrice = (price: number | string | undefined): string => {
    // If price is undefined or null, return a placeholder
    if (price === undefined || price === null) {
      return "Price not available";
    }
  
    // Convert price to a number if it's a string
    const priceAsNumber = typeof price === 'string' ? Number(price) : price;
  
    // Check if the conversion resulted in a valid number
    if (isNaN(priceAsNumber)) {
      return "Invalid price";
    }
  
    // Format the price as Nigerian Naira (₦)
    return priceAsNumber.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    });
  };