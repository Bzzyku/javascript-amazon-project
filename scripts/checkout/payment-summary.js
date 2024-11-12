import { deliveryTime } from "../../data/delivery-time.js";
import { parseCents } from "../../utils/cash.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary() {
  const cart = JSON.parse(localStorage.getItem(`cart`));
  
  let itemsPriceCents = 0;
  let shippingPriceCents = 0;
  let productsQuantity = 0;
  cart.forEach(element => {
    console.log(cart)
    products.forEach((e) => {
      if(element.productId === e.id) 
      element.priceCents = element.quantity*e.priceCents
      productsQuantity +=element.quantity;
    })

    deliveryTime.forEach((option) => {
      if(option.id === element.deliveryOption){
        shippingPriceCents+= option.priceCents
      }
    })

    itemsPriceCents = element.priceCents;
  });
  const totalPriceCents = itemsPriceCents + shippingPriceCents;
  const taxPriceCents = 0.1 * totalPriceCents
  const summaryPriceCents = totalPriceCents + taxPriceCents;

  document.querySelector(`.js-payment-summary`).innerHTML = 
  `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${productsQuantity}):</div>
            <div class="payment-summary-money">$${parseCents(itemsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${parseCents(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${parseCents(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${parseCents(taxPriceCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${parseCents(summaryPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `

}