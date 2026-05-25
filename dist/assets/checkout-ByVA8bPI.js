import{r as e}from"./modulepreload-polyfill-BDH-tZZC.js";import{a as t,c as n,d as r,f as i,l as a,n as o,o as s,p as c,r as l,s as u,u as d}from"./products-BlNQRWXO.js";/* empty css                 */import{t as f}from"./dayjs.min-Bn2rhMy-.js";import{r as p,t as m}from"./orders-data-DeNoF6c3.js";async function h(){try{console.log(`loading...`);let e=document.querySelector(`.js-cart-empty`),t=document.querySelector(`.js-checkout-grid`);e&&t&&(e.classList.add(`hidden`),t.classList.add(`hidden`),console.log(`this is great`));let n=await fetch(`https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options`);if(!n.ok)throw Error(`Unexpected error! HTTP status: ${n.status}-${n.statusText}`);let r=await n.json();return console.log(r),g(r),r}catch(e){console.error(e)}finally{document.querySelector(`.js-loading-homepage`).classList.add(`hidden`)}}function g(e){localStorage.setItem(`kaamnaOptions`,JSON.stringify(e))}o();var _=e(f());c(),n(),p();function v(e,t,n){let r=0,a=0,o=document.querySelector(`.js-payment-summary`);t.forEach(t=>{let{productId:i,deliveryOptionId:o}=t,s=n.find(e=>e.id===i);s&&(r+=s.pricePaisa*t.productQuantity);let c=e.find(e=>e.id===o);c&&(a+=c.shippingCost)});let s=r+a,c=s*.1,l=s+c,u=`
    <div class="payment-summary">
      <h3>The Cost of Desire</h3>
      <div class="summary-row">
        <span>Items (${d(t)}):</span> <span>₹${i(r)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping & handling:</span> <span>₹${i(a)}</span>
      </div>
      <div class="summary-row">
        <span>Total before tax::</span> <span>₹${i(s)}</span>
      </div>
      <div class="summary-row">
        <span>Estimated tax (10%):</span> <span>₹${i(c)}</span>
      </div>
      <hr />
      <div class="summary-row total">
        <span>Order total:</span> <span>₹${i(l)}</span>
      </div>

      <button class="kaamna-btn js-kaamna-btn">FULFILL YOUR DESIRES</button>
    </div>
  `;o&&(o.innerHTML=u),console.log(t),console.log(n);let f;t.forEach(e=>{f=n.filter(t=>t.id===e.productId)}),console.log(f);let p=document.querySelector(`.js-kaamna-btn`);p&&p.addEventListener(`click`,()=>{console.log(`creating order`),console.log(t),m(l)})}n(),c();function y(e,t,n){console.log(e);let r=t.map(t=>{let{productId:r,deliveryOptionId:o}=t;console.log(o);let s=n.find(e=>e.id===r);console.log(s);let c=e.find(e=>e.id===o);if(c&&s){console.log(c),console.log(c);let e=(0,_.default)();console.log(e);let n=e.add(c.deliveryDays,`days`).format(`dddd, MMMM D`);return console.log(n),`
        <div class="cart-item-container" data-cart-item-id="${t.id}">
          <div class="delivery-date">Delivery date: ${n}</div>
  
          <div class="cart-item-details-grid">
            <img src="${s.image}" class="product-image" />
  
            <div class="product-info">
              <div class="product-name">${s.name}</div>
              <div class="product-price">₹${i(s.pricePaisa)}</div>
              <div class="product-quantity js-product-quantity-${r}">
                Quantity: ${t.productQuantity} 
                <span class="link-primary js-update-link" data-product-id="${r}">Update</span>

                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value="${t.productQuantity}" 
                  class="js-quantity-input hidden" 
                  style="width: 45px; padding: 2px;" 
                />
                <span class="link-primary js-save-link hidden" style="margin-left: 5px;">Save</span>

                <span class="link-primary js-delete-link" data-product-id="${r}">Delete</span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="option-title">Choose a delivery option:</div>
              <div class="delivery-options">
                ${a(r,t).deliveryOptionsHtml}
              </div>
            </div>
          </div>
        </div>
      `}}).join(``);function a(t,n){let r;return{deliveryOptionsHtml:e.map(e=>{r=(0,_.default)().add(e.deliveryDays,`days`).format(`dddd, MMMM D`);let a=e.id===n.deliveryOptionId?`checked`:``,o=e.shippingCost;return`
        <div class="delivery-option js-delivery-option" data-delivery-option-id="${e.id}">
          <input type="radio" ${a} name="delivery-${t}" />
          <div class="js-delivery-info">
            <span class="date">
              ${r}
            </span><br />${o?`₹${i(o)}`:`FREE SHIPPING`}
          </div>
        </div>
      `}).join(``),deliveryDateFormatted:r}}let o=document.querySelector(`.js-order-review`);o.innerHTML=r}document.querySelector(`.js-order-review`)?.addEventListener(`click`,async e=>{let t=e.target,n=t.closest(`.cart-item-container`);if(!n)return;let{cartItemId:i}=n.dataset,o=t.closest(`.js-delete-link`);if(o){if(o.textContent=`Deleting...`,o.style.pointerEvents=`none`,await s(i)){console.log(`Successfully removed item ${i} from server!`),n.remove();try{let[e,t]=await Promise.all([u(),h()]),n=localStorage.getItem(`kamnaProducts`)||`[]`,r=JSON.parse(n);t&&e&&r&&(v(t,e,r),console.log(`Payment summary successfully updated!`),y(t,e,r),console.log(`Cart summary successfully updated!`),b(e),e.length?document.querySelector(`.js-checkout-grid`).classList.remove(`hidden`):(document.querySelector(`.js-cart-empty`).classList.remove(`hidden`),console.log(`cart is zero`)))}catch(e){console.error(`Failed to fetch fresh data after deleting item:`,e)}}else alert(`Uh oh! Could not delete the item from the server. Try again.`),o.textContent=`Delete`,o.style.pointerEvents=`auto`;return}if(t.closest(`.js-update-link`)){let e=n.querySelector(`.js-update-link`),t=n.querySelector(`.js-save-link`),r=n.querySelector(`.js-quantity-input`);n.querySelector(`.js-quantity-label`),console.log(r),console.log(t),e.classList.toggle(`hidden`),r.classList.toggle(`hidden`),t.classList.toggle(`hidden`),console.log(r),console.log(t),r.focus();return}if(t.closest(`.js-save-link`)){let e=n.querySelector(`.js-save-link`),t=n.querySelector(`.js-quantity-input`),r=parseInt(t.value,10);if(isNaN(r)||r<1||r>10){alert(`Please enter a valid quantity between 1 and 10.`);return}e.textContent=`Saving...`,e.style.pointerEvents=`none`;try{await a(r,{id:i}),console.log(`Server quantity successfully updated using your function!`);let[e,t]=await Promise.all([u(),h()]),n=localStorage.getItem(`kamnaProducts`)||`[]`,o=JSON.parse(n);t&&e&&o&&(v(t,e,o),y(t,e,o),b(e),e.length?document.querySelector(`.js-checkout-grid`).classList.remove(`hidden`):(document.querySelector(`.js-cart-empty`).classList.remove(`hidden`),console.log(`cart is zero`)))}catch(t){console.error(`Network error while saving quantity:`,t),e.textContent=`Save`,e.style.pointerEvents=`auto`}return}let c=t.closest(`.js-delivery-option`);if(c){let e=c.dataset.deliveryOptionId;if(i&&e){console.log(`Gotcha! Securely pulled dataset from the parent container.`),console.log(`Cart Item ID:`,i),console.log(`Delivery Option ID:`,e);try{let t=await r(i,e);console.log(t);let[n,a]=await Promise.all([u(),h()]),o=localStorage.getItem(`kamnaProducts`)||`[]`,s=JSON.parse(o);console.log(`Fetched fresh data concurrently:`,{freshCart:n,freshOptions:a}),a&&n&&s&&(v(a,n,s),console.log(`Payment summary successfully updated!`),y(a,n,s),console.log(`Cart summary successfully updated!`),n.length?document.querySelector(`.js-checkout-grid`).classList.remove(`hidden`):(document.querySelector(`.js-cart-empty`).classList.remove(`hidden`),console.log(`cart is zero`)))}catch(e){console.error(`One of the API calls failed:`,e)}}return}}),n();function b(e){let t=document.querySelector(`.js-checkout-quantity`);t&&(t.innerText=`Checkout(${d(e)} items)`)}b(t),h().then(e=>{let n=document.querySelector(`.js-cart-empty`),r=document.querySelector(`.js-checkout-grid`);t.length&&e?(console.log(`cart present`),y(e,t,l),v(e,t,l),r.classList.remove(`hidden`)):(console.log(`cart absent`),n.classList.remove(`hidden`))});