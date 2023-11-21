import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { removeFromCart } from '../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
import { updateDeliveryOption } from '../data/cart.js';
//variavel que vai receber o html para toda vez atualizar meu html com os novos itens
// do carrinho


function renderOrderSummary() {
        
    let cartSummaryHTML=""

    const today=dayjs();
    //the method add in dayjs adding a time in ur current time, receiving two
    //parameters, how much, and if its day or minutes etc

    //const deliveryDate= today.add(7,'days');
    //console.log(deliveryDate.format('dddd MMMM D'));



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
    
        }) // a parte do input selector dando o valor do id, faz com que eu possa selecionar os outros seletores, ja que eu posso slecionar apenas um com o mesmo nome, e quando passo o 
        // id, posso ser unico para cada name.
    //mesma coisa aki
   
        let deliveryOptionId= cartItem.deliveryOptionId;
        //console.log(deliveryOptionId);
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                deliveryOption=option;
                
            
            }
        });
        

    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString= deliveryDate.format('dddd MMMM D');


    
        cartSummaryHTML += 
    `   <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}"> 
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                
                </div>
            </div>
            </div>




    `


    })
    //Loop through deliveryOptions, for each option, generate some html, and combine them
    function deliveryOptionsHTML(matchingProduct,cartItem) {

        let html= ``;
        


        deliveryOptions.forEach((deliveryOption) => {
            
            const today=dayjs();
            const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
            
            const dateString= deliveryDate.format('dddd MMMM D');
            const priceString = deliveryOption.priceCents 
            ===0
            ? 'FREE'
            : `${formatCurrency(deliveryOption.priceCents)} -`;


            let isChecked= deliveryOption.id===cartItem.deliveryOptionId;
            
            
            html +=

            `<div class="delivery-option js-delivery-option" 
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">

            <input type="radio"
            ${isChecked ? 'checked' :"" }
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"> 
            <div>
            <div class="delivery-option-date">
                ${dateString};
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
            </div>
        </div>`
        });
        return html;



    }
    //gererating the html automatically

    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelector('.js-order-summary').innerHTML= cartSummaryHTML;
        document.querySelectorAll('.js-delete-link')
            .forEach((link) => {
                link.addEventListener('click', () => {
                    const productId= link.dataset.productId; 
                    removeFromCart(productId);
                    
                    const container_product=document.querySelector(`.js-cart-item-container-${productId}`);
                    console.log(container_product);
                    
                    container_product.remove();
                    
                    
                    
                })
                

            })
        document.querySelectorAll(".js-delivery-option")
            .forEach((element) => {
                element.addEventListener('click', () => {
                    const {productId,deliveryOptionId}=element.dataset;
                    //const productid=element.dataset.productid
                    //const delive..=element.dataset.deli...\
                    //depois de uploadar os dados , eu dou rerun no html automatico 
                    updateDeliveryOption(productId,deliveryOptionId);
                    renderOrderSummary();
                    


                })


                }
            )
        
    });
    //selecionando todos delete link pela classe dele, uso o querysecletor all, faco um loop por todos eles adicionado o evento de click
    }

    renderOrderSummary();