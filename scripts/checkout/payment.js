import { cart, updateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from "../utility/format-currency.js";
import { products } from "../../data/products.js";
import getItem from "../utility/matching-item.js";
import { deliveryOptions } from "../../data/delivery-options.js";

export function renderPaymentSummaryHtml(){
  let totalProductsCost = 0;
  let shippingCost = 0;

  cart.forEach(item => {
    const { productId, deliveryOptionId } = item;

    // normalization for products
    const matchingProduct = getItem(products, productId);

    totalProductsCost += matchingProduct.pricePaisa * item.productQuantity;

    // normalization of delivery options
    const matchingOption = getItem(deliveryOptions, deliveryOptionId);
    shippingCost += matchingOption.shippingCost;

  });

  let totalBeforeTax = totalProductsCost + shippingCost;
  const extimatedTax = totalBeforeTax * 0.1;
  const grandTotal = totalBeforeTax + extimatedTax;

  const paymentHTML = `
    <div class="payment-summary">
      <h3>The Cost of Desire</h3>
      <div class="summary-row">
        <span>Items (${updateCartQuantity()}):</span> <span>₹${formatCurrency(totalProductsCost)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping & handling:</span> <span>₹${formatCurrency(shippingCost)}</span>
      </div>
      <div class="summary-row">
        <span>Total before tax::</span> <span>₹${formatCurrency(totalBeforeTax)}</span>
      </div>
      <div class="summary-row">
        <span>Estimated tax (10%):</span> <span>₹${formatCurrency(extimatedTax)}</span>
      </div>
      <hr />
      <div class="summary-row total">
        <span>Order total:</span> <span>₹${formatCurrency(grandTotal)}</span>
      </div>

      <button class="kaamna-btn">FULFILL YOUR DESIRES</button>
    </div>
  `

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentHTML;

}