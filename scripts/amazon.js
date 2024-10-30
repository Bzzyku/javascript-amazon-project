import { displayProducts } from "./display-products.js";
import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { addProductOnClick ,getLocalStorageValues } from "./add-product-on-click.js";

getLocalStorageValues(cart);
displayProducts(products);

addProductOnClick(cart);





