import{t as e}from"./modulepreload-polyfill-DvoRgtBb.js";import{c as t,f as n,i as r,n as i,p as a,s as o,t as s,u as c}from"./products-BnJ7vxHl.js";/* empty css                 */e((()=>{a(),t(),i();var e=document.querySelector(`.js-expand-menu-btn`),l=document.querySelector(`.js-mobile-menu`);e&&l&&e.addEventListener(`click`,()=>{l.classList.toggle(`mobile-menu-expanded`)}),s(u),o().then(e=>{let t=document.querySelector(`.js-cart-quantity-ld`),n=document.querySelector(`.js-cart-quantity-sd`),r=c(e);t.innerText=r.toString(),n.innerText=r.toString()}),console.log(`got products`);function u(e){let t=document.querySelector(`.js-products-row`),i=e.map(e=>`
      <div class="col">
        <article class="card">
          <figure class="image-box">
            <img loading="lazy" src="${e.image}" class="card-img-top" alt="${e.name} image">
          </figure>
          <div class="card-body">
            <p class="card-title">${e.name}</p>
            <p class="card-text">
              ₹${n(e.pricePaisa)}
            </p>
            <div class="product-ratings">
              <!-- <img src="" alt=""> -->
              <div>
                ★★★★★
              </div>
              <div class="reviews">
                (${e.rating.count})
              </div>
            </div>
            <select name="product-quantity" id="js-quantity-selector-${e.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <div class="added-message js-added-message">✔ Added</div>
            <button class="btn add-to-cart-button js-add-to-hart-button" data-product-id="${e.id}">
              Add to Hart
            </button>
          </div>
        </article>
      </div>
      `).join(``);t&&(t.innerHTML=i);let a;t&&t.addEventListener(`click`,e=>{let t=e.target;if(t.matches(`.js-add-to-hart-button`)){let{productId:e}=t.dataset,n=t.previousElementSibling.previousElementSibling;r(e,Number(n.value)),a&&clearTimeout(a),a=d(t)}})}function d(e){let t=e.previousElementSibling;return console.log(t),t.classList.add(`show`),setTimeout(()=>{t.classList.remove(`show`)},1e3)}var f=document.querySelector(`header`);f&&document.addEventListener(`scroll`,()=>{scrollY>151?f.classList.add(`fixed`):f.classList.remove(`fixed`)})}))();