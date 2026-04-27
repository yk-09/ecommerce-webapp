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

getOrderData();

function renderOrderHtml(orders){
  const ordersHtml = orders.map((order) => {
    const orderHtml = 
    `
      <article class="order-card">
        <header class="order-card-header">
          <div class="meta-item">
            <span class="label">Order Placed:</span>
            <span class="value">March 30</span>
          </div>
          <div class="meta-item">
            <span class="label">Total:</span>
            <span class="value">Rs 63.50</span>
          </div>
          <div class="meta-item order-id-group">
            <span class="label">Order ID:</span>
            <span class="value">2cb8be55-54d8-5c11-7e37-2e801825ff55</span>
          </div>
        </header>

        <div class="order-body">
          <div class="order">
            <div class="product-info">
              <img src="images/products/6-piece-non-stick-baking-set.webp" alt="Nordic Mug Set" class="product-thumb" />
              <div class="product-details">
                <h3>Nordic Mug Set - Sarcasm-Proofed</h3>
                <p class="status">
                  Arriving on: <span class="arrival-date">March 31</span>
                </p>
                <p class="qty">Quantity: 2</p>
                <button class="btn btn-secondary">Buy it again</button>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn btn-primary">Track package</button>
            </div>
          </div>
          <div class="order">
            <div class="product-info">
              <img src="images/products/6-piece-white-dinner-plate-set.jpg" alt="6 Piece White Dinner Plate Set" class="product-thumb" />
              <div class="product-details">
                <h3>6 Piece White Dinner Plate Set</h3>
                <p class="status">
                  Arriving on: <span class="arrival-date">March 31</span>
                </p>
                <p class="qty">Quantity: 2</p>
                <button class="btn btn-secondary">Buy it again</button>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn btn-primary">Track package</button>
            </div>
          </div>
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
}