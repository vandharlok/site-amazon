import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

//variavel que vai receber o html para toda vez atualizar meu html com os novos itens
// do carrinho
let cartSummaryHTML=""


cart.forEach((cartItem) => {
    //estou criando uma varaivel para percorrer o meu carrinho nos id,
    // para que eu possa pegar o resto dos dados usando somente o id
    //entao tenho que importar products do meu products.js 
    const productId= cartItem.productId;


    let matchingProduct;
    products.forEach((product) => {
        //comparando se o meu producty do loop que agora eh um vetor
        //percorrendo o meu carrinho, eh o mesmo 
        if(product.id === productId){
            matchingProduct=product;
        }//agora que tenho o produto, tenho acesso aos outros dados dele
  
    })
    cartSummaryHTML += 
`   <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.priceCents /100}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>




`;


})
//gererating the html automatically
console.log(cartSummaryHTML);
document.addEventListener("DOMContentLoaded", (event) => {
document.querySelector('.js-order-summary').innerHTML= cartSummaryHTML;
});