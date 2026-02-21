import { cart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utility/format-currency.js';
console.log(cart);


let ordersHtml = '';

cart.forEach(cartItem => {

  // normalization
  let matchingProduct;
  products.forEach(product => {
    if(product.id === cartItem.productId){
      matchingProduct = product;
    }
  });

  ordersHtml += `
    <div class="cart-item-container">
          <div class="delivery-date">Delivery date: Tuesday, March 3</div>

          <div class="cart-item-details-grid">
            <img src="${matchingProduct.image}" class="product-image" />

            <div class="product-info">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${formatCurrency(matchingProduct.pricePaisa)}</div>
              <div class="product-quantity">
                Quantity: 1 <span class="link-primary">Update</span>
                <span class="link-primary">Delete</span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="option-title">Choose a delivery option:</div>
              <div class="delivery-options">
                <div class="delivery-option">
                  <input type="radio" checked name="delivery-1" />
                  <div>
                    <span class="date">Tuesday, March 3</span><br />FREE Shipping
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked name="delivery-1" />
                  <div>
                    <span class="date">Tuesday, March 3</span><br />FREE Shipping
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked name="delivery-1" />
                  <div>
                    <span class="date">Tuesday, March 3</span><br />FREE Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `
});

document.querySelector('.js-order-review')
  .innerHTML = ordersHtml;

document.querySelector('.js-checkout-status')
  .innerHTML = `
    <div class="checkout-status js-checkout-status">
      <h2>Checkout (${updateCartQuantity()} items)</h2>
    </div>
  `;