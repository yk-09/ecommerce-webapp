import formatCurrency from '../utility/format-currency';
import { CartItem, updateCartQuantity } from '../data/cart';
import { Product } from '../homepage';
import { DeliveryOption } from '../data/delivery-options';

export function renderPaymentSummaryHtml(
  deliveryOptions: DeliveryOption[]
  , cart: CartItem[]
  , products: Product[]
){
  let totalProductsCost = 0;
  let shippingCost = 0;

  const paymentSummaryEl = document.querySelector('.js-payment-summary') as HTMLElement;

  cart.forEach(item => {
    const { productId, deliveryOptionId } = item;

    // normalization for products
    const matchingProduct: Product | undefined = products.find(
      (product) => product.id === productId
    );

    if(matchingProduct){
      totalProductsCost += matchingProduct.pricePaisa * item.productQuantity;
    }

    // normalization of delivery options
    const matchingOption: DeliveryOption | undefined = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );
    
    if(matchingOption){
      shippingCost += matchingOption.shippingCost;
    }

  });

  let totalBeforeTax = totalProductsCost + shippingCost;
  const extimatedTax = totalBeforeTax * 0.1;
  const grandTotal = totalBeforeTax + extimatedTax;

  const paymentHTML = `
    <div class="payment-summary">
      <h3>The Cost of Desire</h3>
      <div class="summary-row">
        <span>Items (${updateCartQuantity(cart)}):</span> <span>₹${formatCurrency(totalProductsCost)}</span>
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

      <button class="kaamna-btn js-kaamna-btn">FULFILL YOUR DESIRES</button>
    </div>
  `
  if(paymentSummaryEl){
    paymentSummaryEl.innerHTML = paymentHTML;
  };


  // get matching products from existing cart. 
  console.log(cart);
  console.log(products);
  let cartItems;
  cart.forEach((cartItem) => {
    cartItems = products.filter((product) => {
      return product.id === cartItem.productId; 
    });
  });

  console.log(cartItems);

  async function createOrder(){

    const orderData = {
      orderId: crypto.randomUUID(),
      orderTime: new Date().toISOString(), 
      products: cart,
      totalPrice: grandTotal
    };

    try{
      console.log('confirming your order');
      const response = await fetch('https://69ada80eb50a169ec87fef13.mockapi.io/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      console.log(response);
      if(!response.ok){
        throw 'error';
      }

      const order = await response.json();
      // console.log(order);
    }catch(error){
      console.log(error);
    }

    window.location.href = 'orders.html';
  }
  
  const placeOrderBtnEl = document.querySelector('.js-kaamna-btn') as HTMLButtonElement;

  if(placeOrderBtnEl){
    placeOrderBtnEl.addEventListener('click', () => {
      console.log('creating order');
      console.log(cart);
      createOrder();
    });
  }
}