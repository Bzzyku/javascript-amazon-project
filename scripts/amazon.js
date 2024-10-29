
let gridHTML = ''
products.forEach(element => {
  gridHTML+= 
 ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${element.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(element.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${element.id}">
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

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id= "${element.id}"
          data-product-name="${element.name}">
            Add to Cart
          </button>
        </div>`
});
document.querySelector('.products-grid-js').innerHTML = gridHTML;

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