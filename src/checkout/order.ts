import { CartItem } from "../data/cart";
import { DeliveryOption, getDeliveryOptions } from "../data/delivery-options";
import { updateRemoteDeliveryOption, getCartBackend } from "../data/cart";
import { Product } from "../homepage";
import dayjs from "dayjs";
import formatCurrency from "../utility/format-currency";
import { renderPaymentSummaryHtml } from "./payment";

export function renderCartSummary(
  deliveryOptions: DeliveryOption[],
  cart: CartItem[],
  products: Product[]
) {
  console.log(deliveryOptions);
  const ordersHtml = cart
    .map((cartItem) => {
      const { productId, deliveryOptionId } = cartItem;
      console.log(deliveryOptionId);

      // normalization for products

      const matchingProduct: Product | undefined = products.find(
        (product) => product.id === productId
      );

      console.log(matchingProduct);

      // normalization of delivery options;
      const matchingOption: DeliveryOption | undefined = deliveryOptions.find(
        (option) => option.id === deliveryOptionId
      );

      if (matchingOption && matchingProduct) {
        console.log(matchingOption);

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
                ${
                  renderDeliveryOptions(productId, cartItem).deliveryOptionsHtml
                }
              </div>
            </div>
          </div>
        </div>
      `;

        return orderHtml;
      }
    })
    .join("");

  // console.log(ordersHtml);

  function renderDeliveryOptions(productId: string, cartItem: CartItem) {
    let deliveryDateFormatted: string | undefined;
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
          <div class="js-delivery-info">
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

  const orderRowEl = document.querySelector(".js-order-review") as HTMLElement;
  orderRowEl.innerHTML = ordersHtml;
}

const orderRowEl = document.querySelector(".js-order-review") as HTMLElement;

orderRowEl?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  const deliveryOptionEl = target.closest(
    ".js-delivery-option"
  ) as HTMLElement | null;

  if (!deliveryOptionEl) return;

  const { cartItemId, deliveryOptionId } = deliveryOptionEl.dataset;

  if (cartItemId && deliveryOptionId) {
    console.log("Gotcha! Securely pulled dataset from the parent container.");
    console.log("Cart Item ID:", cartItemId);
    console.log("Delivery Option ID:", deliveryOptionId);

    try {
      const updatedItem = await updateRemoteDeliveryOption(
        cartItemId,
        deliveryOptionId
      );
      console.log(updatedItem);

      const [freshCart, freshOptions] = await Promise.all([
        getCartBackend(),
        getDeliveryOptions(),
      ]);

      const productsData = localStorage.getItem("kamnaProducts") || "[]";
      const products: Product[] = JSON.parse(productsData);

      console.log("Fetched fresh data concurrently:", {
        freshCart,
        freshOptions,
      });

      if (freshOptions && freshCart && products) {
        renderPaymentSummaryHtml(freshOptions, freshCart, products);
        console.log("Payment summary successfully updated!");
        renderCartSummary(freshOptions, freshCart, products);
        console.log("Cart summary successfully updated!");
      }
    } catch (error) {
      console.error("One of the API calls failed:", error);
    }
  }
});
