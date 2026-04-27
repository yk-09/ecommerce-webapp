async function getOrderData(){
  const url = 'https://69ada80eb50a169ec87fef13.mockapi.io/orders';
  try{
    console.log('Getting orders from backend');
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await response.json();
    console.log(data);
    const orders = data.toReversed();
    renderOrderHtml(orders);
  }
  catch(error){
    console.error(`Couldn't create order ${error}`);
  }
}

// console.log(localStorage.getItem('KamnaProducts'));
// console.log(localStorage.getItem('KamnaOptions'));

const products = JSON.parse(localStorage.getItem('KamnaProducts')); 
const deliveryOptions = JSON.parse(localStorage.getItem('KamnaOptions')); 
getOrderData();

function renderOrderHtml(orders){
  const ordersHtml = orders.map((order) => {

    const dateString = order.orderTime;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long', 
      day: 'numeric'
    });


    const orderHtml = 
    `
      <article class="order-card">
        <header class="order-card-header">
          <div class="meta-item">
            <span class="label">Order Placed:</span>
            <span class="value">${formattedDate}</span>
          </div>
          <div class="meta-item">
            <span class="label">Total:</span>
            <span class="value">Rs ${(order.totalPrice / 100).toFixed(2)}</span>
          </div>
          <div class="meta-item order-id-group">
            <span class="label">Order ID:</span>
            <span class="value">${order.orderId}</span>
          </div>
        </header>

        <div class="order-body">
          ${renderOrderProducts(order)}
        </div>

        <footer class="order-footer">
          <p class="brand-message">
            Mubarak ho, apka ek aur naye bandhan finalized!
          </p>
        </footer>
      </article>
    `
    return orderHtml;
  }).join('');

  console.log(ordersHtml);
  document.querySelector('.js-order-list')
    .innerHTML = ordersHtml;
}

function renderOrderProducts(order){

  const productsHtml = order.products.map((orderItem) => {

    // normalization for product
    let matchingProduct;
    products.forEach(product => {
      if(orderItem.productId === product.id){
        matchingProduct = product;
      }
    });

    // normalization for deliveryoptions
    let matchingOption;
    deliveryOptions.forEach(option => {
      if(orderItem.deliveryOptionId === option.id){
        matchingOption = option;
      }
    });

    const productHtml = `
      <div class="order">
        <div class="product-info">
          <img src=${matchingProduct.image} alt="Nordic Mug Set" class="product-thumb" />
          <div class="product-details">
            <h3>${matchingProduct.name}</h3>
            <p class="status">
              Arriving on: <span class="arrival-date">March 31</span>
            </p>
            <p class="qty">Quantity: ${orderItem.productQuantity}</p>
            <button class="btn btn-secondary">Buy it again</button>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary">Track package</button>
        </div>
      </div>
    `

    return productHtml;
  }).join('');

  return productsHtml;
}