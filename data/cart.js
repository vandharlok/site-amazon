export const cart=[];

export function addToCart(productId) {
  let matchingItem;
  //looking if the product is already in the cart with this function
  matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}