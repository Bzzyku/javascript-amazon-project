import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { parseCents } from "./cash.js";
displayBasketProducts();

deleteButtonOnClick();


function prepareCart() {
  const cartData = JSON.parse(localStorage.getItem('cart'));
  return cartData.map((e) => {
    const product = products.find((x) => e.productId === x.id);
    if (product) {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        priceCents: product.priceCents,
        quantity: e.quantity 
      };
    }
  }) 
}




function displayBasketProducts () {
  
  let HTML = ''
  console.log(prepareCart())
  prepareCart().forEach((cartItem) => {
    HTML += `
    <div class="cart-item-container-${cartItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${cartItem.image}>

              <div class="cart-item-details">
                <div class=${cartItem.name}>
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-price">
                  $${parseCents(cartItem.quantity*cartItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${cartItem.id}>
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
                    name="delivery-option-${cartItem.id}">
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
                    name="delivery-option-${cartItem.id}">
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
                    name="delivery-option-${cartItem.id}">
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
          </div>`
    })

    document.querySelector('.order-summary').innerHTML = HTML;
  }


  function deleteButtonOnClick() {
    document.querySelectorAll(`.js-delete-quantity-link`).forEach((link) => {
      link.addEventListener('click',() => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
      })
    })
  }

  function removeFromCart(productId) {
    const newCart = [];
    console.log(productId)
    
    JSON.parse(localStorage.getItem(`cart`)).forEach((e) => {
      if(e.productId !== productId){
        newCart.push(e);
      }
    })
    console.log(newCart)
    localStorage.setItem('cart',JSON.stringify(newCart));
    
    document.querySelector(`.cart-item-container-${productId}`).remove();
  }