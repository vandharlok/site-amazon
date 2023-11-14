//JSON.parse convert the string of localstore to array again
//

export let cart = JSON.parse(localStorage.getItem('cart'));
/*

[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  },
  {
    productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1,
  }
  
 
];
*/
//the localstore just save strings, so, i ve to convert the cart in string,
// receive two parameters, the name of i wanna save, and the data, both of them in strings 
function saveLocalStore(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

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
    saveLocalStore();
  }
}
//this function create a new array of products, that include all products that i want, except that, that i delete, so, i create a new cart, and push all elements except the reference from the function
export function removeFromCart(productId){
  const newCart= [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
      
    }
    else{
      console.log('Item removido.');
    }
  });
  cart=newCart;; 
  saveLocalStore();
} 

//this function remove the item from the cart
/*
export function removeFromCart(productId) {
  console.log('Tentando remover o produto com ID:', productId);
  console.log('Carrinho atual:', cart);

  const index = cart.findIndex(cartItem => {
      console.log('Verificando item do carrinho com ID:', cartItem.productId);
      return cartItem.productId === productId;
  });

  if (index !== -1) {
      cart.splice(index, 1);
      console.log('Item removido.');
  } else {
      console.log('Produto não encontrado no carrinho.');
  }

  console.log('Carrinho após a tentativa de remoção:', cart);
}*/