// importing products array from products.js file 
import { products } from '../data/products.js';

import { formatCurrency } from './utility/format-currency.js';

import { cart, addToHart } from '../data/cart.js';


// generating products html using javascript
let productsHTML = '';

products.forEach(product => {

  productsHTML += 
    `
    <div class="col">
      <div class="card">
        <div class="image-box">
          <img src="${product.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <p class="card-title">${product.name}</p>
          <p class="card-text">
            ₹${formatCurrency(product.pricePaisa)}
          </p>
          <div class="product-ratings">
            <!-- <img src="" alt=""> -->
            <div>
              ★★★★★
            </div>
            <div class="reviews">
              (${product.rating.count})
            </div>
          </div>
          <select name="product-quantity" id="js-quantity-selector-${product.id}">
            <option value="1">1</option>
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
          <button class="btn add-to-cart-button js-add-to-hart-button" data-product-id="${product.id}">
            Add to Hart
          </button>
        </div>
      </div>
    </div>
    `
});

// console.log(productsHTML);

document.querySelector('.js-products-row')
  .innerHTML = productsHTML;

// after te html is rendered make add to hart button interactive

document.querySelectorAll('.js-add-to-hart-button')
  .forEach(button => {
    button.addEventListener('click', () => {

      // check if its working
      // console.log('working');

      const { productId } = button.dataset;

      // select quantity selector attatced to this button 
      const quantitySelector = document.getElementById(`js-quantity-selector-${productId}`);

      // get the valu out of it 
      const productQuantity = Number(quantitySelector.value);

      // logic to add product to cart 
      addToHart(productId, productQuantity);
      // console.log(cart);
      
    }); 
  });