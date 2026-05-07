import { formatCurrency } from "./utility/format-currency.js";

import { addToHart, getCartBackend } from '../data/cart.js';

// expanding navbar
const expandBtnEle = document.querySelector(".js-expand-menu-btn");
const mobileMenuEle = document.querySelector(".js-mobile-menu");

expandBtnEle.addEventListener("click", () => {
  mobileMenuEle.classList.toggle("mobile-menu-expanded");
});

getProducts();
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

  productsRowEle.addEventListener('click', (e) => {
    const target = e.target;

    if(e.target.matches('.js-add-to-hart-button')){
      const {productId} = target.dataset;
      
      const quantitySelectorEle = target.previousElementSibling;
      const productQuantity = Number(quantitySelectorEle.value);
      
      addToHart(productId, productQuantity);
    }
  });

}

// products from the backend i.e. a get request
async function getProducts() {
  try {
    console.log("loading...");
    const response = await fetch(
      "https://69ada80eb50a169ec87fef13.mockapi.io/products"
    );

    if (!response.ok) {
      throw new Error(`http error status: ${response.status}`);
    }
    const products = await response.json();
    console.log(products);

    localStorage.setItem("kamnaProducts", JSON.stringify(products));

    renderProductsHtml(products);
  } catch (error) {
    console.log("unexpected error! please try again later!");
    console.log(error);
  }
}
