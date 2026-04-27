// importing products array from products.js file 
// import { products } from '../data/products.js';

import { formatCurrency } from './utility/format-currency.js';

import { addToHart, saveToStorage, updateCartQuantity } from '../data/cart.js';

getProducts();

function renderProductsHtml(products){

  document.querySelector('.js-cart-quantity')
    // .innerHTML = updateCartQuantity();

  const productsHtml = products.map(product => {

    const productHtml = 
      `
      <div class="col">
        <div class="card">
          <div class="image-box">
            <img src="${product.image}" class="card-img-top" alt="...">
          </div>
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
            <select name="product-quantity" id="js-quantity-selector-${product.id}">
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
            <button class="btn add-to-cart-button js-add-to-hart-button" data-product-id="${product.id}">
              Add to Hart
            </button>
          </div>
        </div>
      </div>
      `
    return productHtml;  
  }).join('');

  // console.log(productsHTML);

  document.querySelector('.js-products-row')
    .innerHTML = productsHtml;

  // after te html is rendered make add to hart button interactive

  document.querySelectorAll('.js-add-to-hart-button')
    .forEach(button => {
      button.addEventListener('click', () => {

        // check if its working
        // console.log('working');

        const { productId } = button.dataset;

        // select quantity selector attatced to this button 
        const quantitySelector = document.getElementById(`js-quantity-selector-${productId}`);

        // get the value out of it 
        const productQuantity = Number(quantitySelector.value);

        // logic to add product to cart 
        addToHart(productId, productQuantity);
        // console.log(cart);

        // save the updated cart to storage 
        saveToStorage();

        // lets update the cart quantity on the homepage
        document.querySelector('.js-cart-quantity')
          .innerHTML = updateCartQuantity();
      }); 
    });

}

// products from the backend i.e. a get request 
async function getProducts(){
  try{
    console.log('loading...');
    const response = await fetch('https://69ada80eb50a169ec87fef13.mockapi.io/products');
    
    if(!response.ok){
      throw new Error(`http error status: ${response.status}`);
    }
    const products = await response.json();
    console.log(products);

    renderProductsHtml(products);
  }catch(error){
    console.log('unexpected error! please try again later!');
    console.log(error);
  }
};