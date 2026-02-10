export const cart = [];

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