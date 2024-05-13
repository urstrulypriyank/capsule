export  function getMinSellingPrice(products) {
    if (products.length === 0) return null; // Return null if the array is empty
    
    return products.reduce((minPrice, product) => Math.min(minPrice, product.selling_price), products[0].selling_price);
}