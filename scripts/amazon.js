import { displayProducts } from "./display-products.js";
import { products } from "../data/products.js";
import { cart } from "../data/cart.js";


displayProducts(products);

document.querySelectorAll('.js-add-to-cart').forEach((button) => {

  button.addEventListener('click',() => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const choosenNumberOfProducts = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let matchingProduct;
    cart.forEach((element) => {
      productId ===  element.productId ? matchingProduct = element : false; 
    })

    matchingProduct ? matchingProduct.quantity+=choosenNumberOfProducts :
    cart.push({
      productId: productId,
      productName: productName,
      quantity: choosenNumberOfProducts
    });
    let numberOfProducts = 0 ;
    cart.forEach((element) => {
      numberOfProducts += element.quantity
    })
    document.querySelector(`.js-cart-quantity`).innerHTML = numberOfProducts;

    document.querySelector('.js-added-to-cart').classList.add('show-added');

    setTimeout( () => {
      document.querySelector('.js-added-to-cart').classList.remove('show-added');
    }, 2000)
  })
})


