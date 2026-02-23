// persistant shopping cart
export const cart = JSON.parse(localStorage.getItem('cart')) || [];

// add products to cart
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

// saves cart to local storage 
export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// update the quantity of the cart
export function updateCartQuantity(){

  let cartQuantity = 0;

  cart.forEach(cartItem => {

    cartQuantity += cartItem.productQuantity;

  });

  return cartQuantity;
}
