export let cart = [];

export function addProductOnClick(cart){
  
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {

    button.addEventListener('click',() => {
      const productId = button.dataset.productId;
      const choosenNumberOfProducts = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);
      console.log(cart)
      let matchingProduct;
      cart.forEach((element) => {
        productId ===  element.productId ? matchingProduct = element : false; 
      })
  
      matchingProduct ? matchingProduct.quantity+=choosenNumberOfProducts :
      cart.push({
        productId: productId,
        quantity: choosenNumberOfProducts,
        deliveryOption: 3
      });

      updateLocalStorageCart(cart);

      updateNumberOfProductsInBasket(cart,choosenNumberOfProducts);

      

      displayAddedInformation(productId);

    })
  })

}



function displayAddedInformation(productId){
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('show-added');

  setTimeout( () => {
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('show-added');
  }, 2000)
}


function updateNumberOfProductsInBasket(cart, choosenNumberOfProducts) {
  let numberOfProducts = 0 ;
  cart.forEach((element) => {
    numberOfProducts += element.quantity;
    
  })
  updateNumberOfProductsInLocalStorageBasket(choosenNumberOfProducts);
  document.querySelector(`.js-cart-quantity`).innerHTML = localStorage.getItem('numberOfProducts')
  
}

export function updateLocalStorageCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateNumberOfProductsInLocalStorageBasket(numberOfProducts){

    localStorage.setItem('numberOfProducts',JSON.stringify(numberOfProducts + (JSON.parse(localStorage.getItem('numberOfProducts')))||0));
    
}

export function getLocalStorageValues (cart) {
  if(JSON.parse(localStorage.getItem('cart'))){
    cart.push(...JSON.parse(localStorage.getItem('cart')));
  }

  document.querySelector(`.js-cart-quantity`).innerHTML = JSON.parse(localStorage.getItem('numberOfProducts')) || 0;
}