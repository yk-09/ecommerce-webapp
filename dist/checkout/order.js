import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "../utility/format-currency.js";
export function renderCartSummary(deliveryOptions, cart, products) {
    console.log(deliveryOptions);
    const ordersHtml = cart
        .map((cartItem) => {
        const { productId, deliveryOptionId } = cartItem;
        console.log(deliveryOptionId);
        // normalization for products
        const matchingProduct = products.find((product) => product.id === productId);
        console.log(matchingProduct);
        // normalization of delivery options;
        const matchingOption = deliveryOptions.find((option) => option.id === deliveryOptionId);
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
              <div class="product-price">₹${formatCurrency(matchingProduct.pricePaisa)}</div>
              <div class="product-quantity js-product-quantity-${productId}">
                Quantity: ${cartItem.productQuantity} 
                <span class="link-primary js-update-link" data-product-id="${productId}">Update</span>
                <span class="link-primary js-delete-link" data-product-id="${productId}">Delete</span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="option-title">Choose a delivery option:</div>
              <div class="delivery-options">
                // {
                //   renderDeliveryOptions(productId, cartItem).deliveryOptionsHtml
                // }
              </div>
            </div>
          </div>
        </div>
      `;
            return orderHtml;
        }
    })
        .join("");
    console.log(ordersHtml);
    // rendered cartitems on the page
    const orderRowEl = document.querySelector(".js-order-review");
    orderRowEl.innerHTML = ordersHtml;
}
//# sourceMappingURL=order.js.map