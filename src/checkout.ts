import { renderOrderHtml } from './checkout/order';
import { renderPaymentSummaryHtml } from './checkout/payment';
import { CartItem } from './data/cart';
import { Product } from './homepage';


export async function getDeliveryOptionsBackend() {
  const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options'
  try{
    console.log('loading state');

    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`Unepected Http Error: ${response.status}-${response.statusText}`);
    }

    const deliveryOptions = await response.json();

    const cartData = localStorage.getItem('cart') || '[]';
    const cart: CartItem[] = JSON.parse(cartData);

    const productData = localStorage.getItem('kamnaProducts') || '[]';
    const products: Product[] = JSON.parse(productData);

    renderOrderHtml(deliveryOptions, cart, products);
    renderPaymentSummaryHtml(deliveryOptions, cart, products)

    console.log(deliveryOptions);
  }catch(error){
    console.error(error);
  }
}