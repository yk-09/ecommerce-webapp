import { products } from '../data/products.js';

let productsHTML = '';

products.forEach(product => {

  productsHTML += 
    `
    <div class="col">
      <div class="card">
        <div class="image-box">
          <img src="${product.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <p class="card-title">${product.name}</p>
          <p class="card-text">
            R${(product.pricePaisa / 100).toFixed(2)}
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
          <select name="" id="">
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
          <button class="btn add-to-cart-button">
            Add to Hart
          </button>
        </div>
      </div>
    </div>
    `
});

console.log(productsHTML);

document.querySelector('.js-products-row')
  .innerHTML = productsHTML;