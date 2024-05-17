
export function getMinSellingPrice(products) {
    if (!Array.isArray(products) || products.length === 0) return null; // Ensure products is an array and not empty

    return products.reduce((minPrice, product) => Math.min(minPrice, product.selling_price), products[0].selling_price);
}
