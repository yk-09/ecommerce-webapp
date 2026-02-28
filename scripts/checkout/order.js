import { cart, saveToStorage, updateCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utility/format-currency.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import getItem from "../utility/matching-item.js";
import { renderPaymentSummaryHtml } from './payment.js';

export function renderOrderHtml() {
  // updated the checkout quantity
  document.querySelector(".js-checkout-status").innerHTML = `
    <div class="checkout-status js-checkout-status">
      <h2>Checkout (${updateCartQuantity()} items)</h2>
    </div>
  `;

  let ordersHtml = "";

  cart.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;

    // normalization for products
    const matchingProduct = getItem(products, productId);

    // normalization of delivery options
    const matchingOption = getItem(deliveryOptions, deliveryOptionId);

    // delivery date
    const todayDate = dayjs();
    const deliveryDate = todayDate.add(matchingOption.days, "days");
    const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

    ordersHtml += `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: ${deliveryDateFormatted}</div>

        <div class="cart-item-details-grid">
          <img src="${matchingProduct.image}" class="product-image" />

          <div class="product-info">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">₹${formatCurrency(
              matchingProduct.pricePaisa
            )}</div>
            <div class="product-quantity">
              Quantity: ${
                cartItem.productQuantity
              } <span class="link-primary">Update</span>
              <span class="link-primary js-delete">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="option-title">Choose a delivery option:</div>
            <div class="delivery-options">
              ${renderDeliveryOptions(productId, cartItem).deliveryOptionsHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  function renderDeliveryOptions(productId, cartItem) {
    let deliveryOptionsHtml = "";
    let deliveryDateFormatted;
    deliveryOptions.forEach((deliveryOption) => {
      // delivery date
      const todayDate = dayjs();
      const deliveryDate = todayDate.add(deliveryOption.days, "days");
      deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

      // checked delivery option
      const isChecked =
        deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";
      let cost = deliveryOption.shippingCost;
      deliveryOptionsHtml += `
        <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${
        deliveryOption.id
      }">
          <input type="radio" ${isChecked} name="delivery-${productId}" />
          <div>
            <span class="date">
              ${deliveryDateFormatted}
            </span><br />${cost ? `₹${formatCurrency(cost)}` : `FREE SHIPPING`}
          </div>
        </div>
      `;
    });

    return { deliveryOptionsHtml, deliveryDateFormatted };
  }

  // rendered cartitems on the page
  document.querySelector(".js-order-review").innerHTML = ordersHtml;

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      // console.log('hehe');
      const { productId, deliveryOptionId } = option.dataset;
      // console.log(productId);
      // console.log(deliveryOptionId);

      // console.log(cart);

      let matchingItem;

      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
        // console.log('working-loop');
      });
      console.log(matchingItem);
      matchingItem.deliveryOptionId = deliveryOptionId;
      console.log(matchingItem);

      saveToStorage();
      renderOrderHtml();
      renderPaymentSummaryHtml();
    });
  });
}
