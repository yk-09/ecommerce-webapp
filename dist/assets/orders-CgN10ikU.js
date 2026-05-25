import{r as e,t}from"./modulepreload-polyfill-BDH-tZZC.js";/* empty css                 */import{t as n}from"./dayjs.min-Bn2rhMy-.js";import{n as r,r as i}from"./orders-data-DeNoF6c3.js";t((()=>{i();var t=e(n());r(l),console.log(localStorage.getItem(`kamnaProducts`)),console.log(localStorage.getItem(`kaamnaOptions`));var a=localStorage.getItem(`kamnaProducts`)||`[]`,o=JSON.parse(a),s=localStorage.getItem(`kaamnaOptions`)||`[]`,c=JSON.parse(s);function l(e){let n=e.map(e=>{let n=e.orderTime;return`
      <article class="order-card">
        <header class="order-card-header">
          <div class="meta-item">
            <span class="label">Order Placed:</span>
            <span class="value">${(0,t.default)(n).format(`dddd, MMMM D`)}</span>
          </div>
          <div class="meta-item">
            <span class="label">Total:</span>
            <span class="value">Rs ${(e.totalPrice/100).toFixed(2)}</span>
          </div>
          <div class="meta-item order-id-group">
            <span class="label">Order ID:</span>
            <span class="value">${e.orderId}</span>
          </div>
        </header>

        <div class="order-body">
          ${u(e)}
        </div>

        <footer class="order-footer">
          <p class="brand-message">
            Mubarak ho, apka ek aur naye bandhan finalized!
          </p>
        </footer>
      </article>
    `}).join(``);console.log(n);let r=document.querySelector(`.js-order-list`);r&&(r.innerHTML=n)}function u(e){return e.products.map(t=>{let n=o.find(e=>t.productId===e.id);if(!n){console.error(`Product not found:`,t.productId);return}if(!c.find(e=>t.deliveryOptionId===e.id)){console.error(`Options not found:`,t.productId);return}return`
      <div class="order">
        <div class="product-info">
          <img src=${n.image} alt="Nordic Mug Set" class="product-thumb" />
          <div class="product-details">
            <h3>${n.name}</h3>
            <p class="status">
              Arriving on: <span class="arrival-date">March 31</span>
            </p>
            <p class="qty">Quantity: ${t.productQuantity}</p>
          </div>
        </div>
        <div class="product-actions">
          <a class="btn btn-primary" href="tracking-page.html?orderId=${e.orderId}&productId=${t.productId}">
            Track package
          </a>
        </div>
      </div>
    `}).join(``)}}))();