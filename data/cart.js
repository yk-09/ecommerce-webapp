export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToHart(productId, productQuantity){

  let matchingProduct;

  cart.forEach(cartItem => {

    if(cartItem.productId === productId){
      matchingProduct = cartItem;
    };
  });

  if(matchingProduct){
    matchingProduct.productQuantity += productQuantity;
  }else{
    cart.push({
      productId,
      productQuantity
    });
  }
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(){

  let cartQuantity = 0;

  cart.forEach(cartItem => {

    cartQuantity += cartItem.productQuantity;

  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}