import { updateCartQuantity } from '../../data/cart.js'
import { getDeliveryOptionsBackend } from '../checkout.js';
import { formatCurrency } from "../utility/format-currency.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import getItem from "../utility/matching-item.js";
import { renderPaymentSummaryHtml } from "./payment.js";

getDeliveryOptionsBackend();
const cartQuantityEle = document.querySelector('.js-checkout-quantity');

cartQuantityEle.innerText = `CheckOut( ${updateCartQuantity(JSON.parse(localStorage.getItem('cart')))} items )`;

export function renderOrderHtml(deliveryOptions, cart, products) {

  console.log(deliveryOptions);
  const ordersHtml = cart.map((cartItem) => {
      const { productId, deliveryOptionId } = cartItem;
      console.log(deliveryOptionId);

      // normalization for products
      const matchingProduct = getItem(products, productId);

      // normalization of delivery options
      const matchingOption = getItem(deliveryOptions, deliveryOptionId);

      console.log(matchingOption);
      // delivery date
      const todayDate = dayjs();
      console.log(todayDate);

      const deliveryDate = todayDate.add(matchingOption.deliveryDays, "days");

      const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

      console.log(deliveryDateFormatted);
      let orderHtml = `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: ${deliveryDateFormatted}</div>

        <div class="cart-item-details-grid">
          <img src="${matchingProduct.image}" class="product-image" />

          <div class="product-info">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">₹${formatCurrency(
              matchingProduct.pricePaisa
            )}</div>
            <div class="product-quantity js-product-quantity-${productId}">
              Quantity: ${cartItem.productQuantity} 
              <span class="link-primary js-update-link" data-product-id="${productId}">Update</span>
              <span class="link-primary js-delete-link" data-product-id="${productId}">Delete</span>
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

      return orderHtml;
    })
    .join("");

  console.log(ordersHtml);
  function renderDeliveryOptions(productId, cartItem) {
    let deliveryDateFormatted;
    const deliveryOptionsHtml = deliveryOptions
      .map((deliveryOption) => {
        // delivery date
        const todayDate = dayjs();
        const deliveryDate = todayDate.add(deliveryOption.deliveryDays, "days");
        deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

        // checked delivery option
        const isChecked =
          deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";
        let cost = deliveryOption.shippingCost;
        let deliveryOptionHtml = `
        <div class="delivery-option js-delivery-option" data-cart-item-id="${
          cartItem.id
        }" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked} name="delivery-${productId}" />
          <div>
            <span class="date">
              ${deliveryDateFormatted}
            </span><br />${cost ? `₹${formatCurrency(cost)}` : `FREE SHIPPING`}
          </div>
        </div>
      `;

        return deliveryOptionHtml;
      })
      .join("");

    return { deliveryOptionsHtml, deliveryDateFormatted };
  }

  // rendered cartitems on the page
  document.querySelector(".js-order-review").innerHTML = ordersHtml;

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      // console.log('hehe');
      const { cartItemId, deliveryOptionId } = option.dataset;
      // console.log(productId);
      // console.log(deliveryOptionId);

      // console.log(cart);

      // let matchingItem;

      // cart.forEach((item) => {
      //   if (item.productId === productId) {
      //     matchingItem = item;
      //   }
      // });
      async function updateDeliveryOption(
        cartItemId,
        newDeliveryOptionId
      ) {
        try {
          // 1. The URL usually includes the ID of the item you are updating
          const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItemId}`;

          // 2. Make the PUT request
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            // 3. Send the new data as a JSON string
            body: JSON.stringify({
              deliveryOptionId: newDeliveryOptionId,
            }),
          });

          // 4. Check if the update was successful
          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - Failed to update delivery option`
            );
          }

          const updatedData = await response.json();
          console.log("Success! Cart item updated:", updatedData);
          fetchAllData();

          return updatedData;
        } catch (error) {
          console.error("Failed to send PUT request:", error);
        }
      }

      updateDeliveryOption(cartItemId, deliveryOptionId);

      // console.log(matchingItem);
      // matchingItem.deliveryOptionId = deliveryOptionId;
      // console.log(matchingItem);
    });
  });

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      console.log(productId);

      // updating cart on clicking delete link
      cart.forEach((item, position) => {
        if (productId === item.productId) {
          cart.splice(position, 1);
        }
      });

      saveToStorage();
      renderOrderHtml();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      let matchingItem;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      console.log(productId);

      document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `
          <input class="js-input-${productId}" type="number">
          <span class="link-primary js-save-link-${productId}">Save</span>
          <span class="link-primary js-delete-link" data-product-id="${productId}">Delete</span>
        `;

      const saveLink = document.querySelector(`.js-save-link-${productId}`);
      saveLink.addEventListener("click", () => {
        const updatedQuantityElement = document.querySelector(
          `.js-input-${productId}`
        );
        const updatedQuantity = Number(updatedQuantityElement.value);
        matchingItem.productQuantity = updatedQuantity;
        saveToStorage();
        renderOrderHtml();
        console.log(cart);
      });
    });
  });
}
