import { formatCurrency } from "./utility/format-currency.js";
import { addToHart, getCartBackend } from '../data/cart.js';
import { getProducts } from '../data/products.js';

// expanding navbar
const expandBtnEle = document.querySelector(".js-expand-menu-btn");
const mobileMenuEle = document.querySelector(".js-mobile-menu");

expandBtnEle.addEventListener("click", () => {
  mobileMenuEle.classList.toggle("mobile-menu-expanded");
});

getProducts(renderProductsHtml);
getCartBackend();

function renderProductsHtml(products) {

  const productsRowEle = document.querySelector(".js-products-row");
  const productsHtml = products
    .map((product) => {
      const productHtml = `
      <div class="col">
        <article class="card">
          <figure class="image-box">
            <img loading="lazy" src="${product.image}" class="card-img-top" alt="${product.name} image">
          </figure>
          <div class="card-body">
            <p class="card-title">${product.name}</p>
            <p class="card-text">
              ₹${formatCurrency(product.pricePaisa)}
            </p>
            <div class="product-ratings">
              <!-- <img src="" alt=""> -->
              <div>
                ★★★★★
              </div>
              <div class="reviews">
                (${product.rating.count})
              </div>
            </div>
            <select name="product-quantity" id="js-quantity-selector-${
              product.id
            }">
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
            <button class="btn add-to-cart-button js-add-to-hart-button" data-product-id="${
              product.id
            }">
              Add to Hart
            </button>
          </div>
        </article>
      </div>
      `;
      return productHtml;
    })
    .join("");

  // console.log(productsHTML);

  productsRowEle.innerHTML = productsHtml;

  // after te html is rendered make add to hart button interactive 
  let timeoutId;
  productsRowEle.addEventListener('click', (e) => {
    const target = e.target;

    if(e.target.matches('.js-add-to-hart-button')){
      const {productId} = target.dataset;
      
      const quantitySelectorEle = target.previousElementSibling.previousElementSibling;
      const productQuantity = Number(quantitySelectorEle.value);
      
      addToHart(productId, productQuantity);
      if(timeoutId){
        clearTimeout(timeoutId);
        timeoutId = handleAddedMessage(target);
      }else{
        timeoutId = handleAddedMessage(target);
      };
    }
  });

};

function handleAddedMessage(target){
  const addedMessageEle = target.previousElementSibling;
  console.log(addedMessageEle);
  addedMessageEle.classList.add('show');

  return ( 
    setTimeout(()=>{
      addedMessageEle.classList.remove('show');
    },1000)
  )

}

const headerEle = document.querySelector('header');
document.addEventListener('scroll', (e) => {
  if(scrollY > 151){
    headerEle.classList.add('fixed');
  }else{
    headerEle.classList.remove('fixed');
  }
});