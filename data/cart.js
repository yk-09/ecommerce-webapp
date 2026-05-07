export function addToHart(productId, productQuantity){
  console.log(productId);
  console.log(productQuantity);

  // working
  getCartBackend(productQuantity, productId);
}

async function addToCartBackend(productId, productQuantity){

  const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/cart'
  try{
    console.log('loading');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId,
        productQuantity,
        deliveryOptionId : '1'
      })
    });

    if(!response.ok){
      throw new Error(`Unexpected error! http status: ${response.status}`); 
    }

    const cart = await response.json();
    console.log(cart);
    getCartBackend();
  }catch(e){
    console.error(e);
  }
}

export async function getCartBackend(productQuantity, productId){

  const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/cart'
  try{
    console.log('loading');
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`Unexpected error! http status: ${response.status}`);
    }

    const cart = await response.json();
    console.log(cart);

    if(productQuantity && productId){
      updateCart(cart, productQuantity, productId);
    }else{
      saveToStorage(cart);
      document.querySelector('.js-cart-quantity').innerText = updateCartQuantity(cart);
    }
  }catch(e){
    console.error(e);
  }
}

function updateCart(cart, productQuantity, productId){
  let existingProduct;
  let cartItemId;
  cart.forEach(cartItem => {

    if(cartItem.productId === productId){
      existingProduct = cartItem;
      cartItemId = existingProduct.id;
      console.log(existingProduct);
      console.log(cartItemId);
    };
  });

  console.log(existingProduct);
  if(existingProduct){
    const newQty = existingProduct.productQuantity + productQuantity;
    updateCartItemQuantity(newQty, cartItemId);
  }else{
    addToCartBackend(productId, productQuantity);
  }
};
 
async function updateCartItemQuantity(newQty, cartItemId){

  const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItemId}`;
  try{
    console.log(typeof productQuantity);
    console.log(cartItemId);
    console.log('loading');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productQuantity: newQty
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.status}`);
    }

    const updatedData = await response.json();
    console.log(updatedData);
    console.log('Update successful:', updatedData);
    getCartBackend();
  }catch(e){
    console.error('Error updating cart:', e);
  }
}

// saves cart to local storage 
function saveToStorage(cart){
  localStorage.setItem('kamnaCart', JSON.stringify(cart));
}

// update the quantity of the cart
function updateCartQuantity(cart){

  let cartQuantity = 0;

  cart.forEach(cartItem => {

    cartQuantity += cartItem.productQuantity;

  }); 

  return cartQuantity;
}
