import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';
//variavel que vai armazenar cada produto novo 
let productsHTML= '' ;




products.forEach((products) => {
  productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${products.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${products.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${products.rating.count}
                </div>
            </div>

            <div class="product-price"> <!-- tofixed deixa 2 casas decimais -->
                $${formatCurrency(products.priceCents)} 
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart " 
            data-product-id="${products.id}">
                Add to Cart
            </button>
            </div>
    `;
});


function updateCartQuantity(){
    //getting the quantity with the button add to cart
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    //this code make the interative change of the quantity in the website cart, increasing the value each buy
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".js-products-grid").innerHTML = productsHTML;
    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
        //the function that run when we click the button
        const productId= button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
        
        })
      });
    });

//aki estou pegando uma lista de todos os botoes de adicionar ao carrinho, e podemos lopar esses botoes

