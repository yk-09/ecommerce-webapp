export function addToHart(productId: string, productQuantity: number){
  console.log(productId);
  console.log(productQuantity);

  // working
  getCartBackend(productQuantity, productId);
}

async function addToCartBackend(productId: string, productQuantity: number){

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

export async function getCartBackend(productQuantity?: number, productId?: string){

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
      const cartQuantityLdEl = document.querySelector('.js-cart-quantity-ld') as HTMLSpanElement;
      const cartQuantitySdEl = document.querySelector('.js-cart-quantity-sd') as HTMLSpanElement;
      saveToStorage(cart);
      const cartQuantity: number = updateCartQuantity(cart);
      cartQuantityLdEl.innerText = cartQuantity.toString();
      cartQuantitySdEl.innerText = cartQuantity.toString();
    }
  }catch(e){
    console.error(e);
  }
}

function updateCart(cart: CartItem[], productQuantity: number, productId: string){
  let existingProduct: CartItem | undefined;
  let cartItemId: string | undefined;
  cart.forEach(cartItem => {

    if(cartItem.productId === productId){
      existingProduct = cartItem;
      cartItemId = existingProduct.id;
      console.log(existingProduct);
      console.log(cartItemId);
    };
  });

  if(existingProduct && cartItemId){
    const newQty = existingProduct.productQuantity + productQuantity;
    updateCartItemQuantity(newQty, cartItemId);
  }else{
    addToCartBackend(productId, productQuantity);
  }
};
 
async function updateCartItemQuantity(newQty: number, cartItemId: string){

  const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItemId}`;
  try{
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

export interface CartItem {
  productId: string,
  productQuantity: number,
  deliveryOptionId: string,
  readonly id: string 
}

function saveToStorage(cart: CartItem[]): void{
  localStorage.setItem('kamnaCart', JSON.stringify(cart));
}

// update the quantity of the cart
export function updateCartQuantity(cart: CartItem[]): number {

  let cartQuantity = 0;

  cart.forEach(cartItem => {

    cartQuantity += cartItem.productQuantity;

  }); 

  return cartQuantity;
}
