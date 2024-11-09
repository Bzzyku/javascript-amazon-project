import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { parseCents } from "./cash.js";
import { deliveryTime } from "./delivery-time.js";
import { getLocalStorageValues, updateLocalStorageCart } from "./add-product-on-click.js";

// getLocalStorageValues(cart)
displayBasketProducts();
deleteButtonOnClick();
deliveryOptionsEventListener();


function prepareCart() {
  let cartData = JSON.parse(localStorage.getItem('cart'));
  console.log(cartData)
    return cartData.map((e) => {
    const product = products.find((x) => e.productId === x.id);
    if (product) {
      return {
        productId: product.id,
        name: product.name,
        image: product.image,
        priceCents: product.priceCents,
        quantity: e.quantity,
        deliveryOption: e.deliveryOption
      };
    }
  }).filter(Boolean);

}

function displayBasketProducts() {
  console.log(prepareCart());
  cart.push(...prepareCart());
  let HTML = ''
  cart.forEach((cartItem) => {
    let option;
    deliveryTime.forEach((e) => {
      if (e.id === cartItem.deliveryOption){
        option = e;
        console.log(option)
      } 
    })

    const currentTime = dayjs();
    const date = currentTime.add(option.deliveryDays, 'day')


    HTML += `
    <div class="cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: ${date.format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${cartItem.image}>

              <div class="cart-item-details">
                <div class="cart-item-name">
                ${cartItem.name}
                </div>
                <div class="product-price">
                  $${parseCents(cartItem.quantity * cartItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${cartItem.productId}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" checked>
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem)}
              </div>
            </div>
          </div>`
  })
  document.querySelector('.order-summary').innerHTML = HTML;
  
}

function deliveryOptionsHTML(cartItem) {

  let HTML = '';
  deliveryTime.forEach((e) => {
    const currentTime = dayjs();
    const date = currentTime.add(e.deliveryDays, 'day')
    const price = e.id === 1
      ? 'FREE Shipping'
      : `$${parseCents(e.priceCents)} - Shipping`;

    const isChecked = e.id === cartItem.deliveryOption;

    HTML +=
      `
        <div class="delivery-option js-delivery-option"
        data-cart-item-id="${cartItem.productId}"
        data-delivery-option-id="${e.id}">
          <input type="radio" ${isChecked ? `checked` : ``}
            class="delivery-option-input"
            name="delivery-option-${cartItem.productId}">
          <div>
            <div class="delivery-option-date">
              ${date.format('dddd, MMMM D')}
            </div>
            <div class="delivery-option-price">
              ${price}
            </div>
          </div>
        </div>  
    `
  })
  return HTML;
}

function deliveryOptionsEventListener() {

  document.querySelectorAll(`.js-delivery-option`).forEach((e => {
    e.addEventListener('click', () => {

      const { cartItemId, deliveryOptionId } = e.dataset;

      updateDeliveryOption(cartItemId, deliveryOptionId)
    });
  }));
}


function updateDeliveryOption(productId, deliveryId) {

  cart.forEach((e) => {
   
    if (e.productId === productId) {
      e.deliveryOption = parseInt(deliveryId);
    }
  });
  updateLocalStorageCart(cart)
}


function deleteButtonOnClick() {
  document.querySelectorAll(`.js-delete-quantity-link`).forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
    })
  })
}

function removeFromCart(productId) {
  const newCart = [];
  JSON.parse(localStorage.getItem(`cart`)).forEach((e) => {
    if (e.productId !== productId) {
      newCart.push(e);
    }
  })
  localStorage.setItem('cart', JSON.stringify(newCart));

  document.querySelector(`.cart-item-container-${productId}`).remove();
}