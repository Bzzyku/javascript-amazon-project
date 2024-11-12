import { displayProducts } from "./amazon/display-products.js";
import { products } from "../data/products.js";
import { cart,addProductOnClick ,getLocalStorageValues } from "../data/cart.js";

getLocalStorageValues(cart)
displayProducts(products);
addProductOnClick(cart);





