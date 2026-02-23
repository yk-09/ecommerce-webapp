import { cart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utility/format-currency.js';
import { deliveryOptions } from '../data/delivery-options.js';
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
          <div class="product-price">₹${formatCurrency(matchingProduct.pricePaisa)}</div>
          <div class="product-quantity">
            Quantity: ${cartItem.productQuantity} <span class="link-primary">Update</span>
            <span class="link-primary js-delete">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="option-title">Choose a delivery option:</div>
          <div class="delivery-options">
            ${renderDeliveryOptions(matchingProduct.id)}
          </div>
        </div>
      </div>
    </div>
  `
});

function renderDeliveryOptions(productId){
  let deliveryOptionsHtml = '';
   
  deliveryOptions.forEach(deliveryOption => {

    let cost = deliveryOption.shippingCost;
    deliveryOptionsHtml += 
    `
      <div class="delivery-option">
        <input type="radio" checked name="delivery-${productId}" />
        <div>
          <span class="date">
            Tuesday, March 3
          </span><br />${cost ? `₹${formatCurrency(cost)}` : `FREE SHIPPING`}
        </div>
      </div>
    `
  });

  return deliveryOptionsHtml;
}

// rendered cartitems on the page 
document.querySelector('.js-order-review')
  .innerHTML = ordersHtml;


// updated the checkout quantity
document.querySelector('.js-checkout-status')
  .innerHTML = `
    <div class="checkout-status js-checkout-status">
      <h2>Checkout (${updateCartQuantity()} items)</h2>
    </div>
  `;