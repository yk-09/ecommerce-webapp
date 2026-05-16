import { renderOrderHtml } from './checkout/order';
import { renderPaymentSummaryHtml } from './checkout/payment';


export async function getDeliveryOptionsBackend(){
  const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options'
  try{
    console.log('loading state');

    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`Unepected Http Error: ${response.status}-${response.statusText}`);
    }

    const deliveryOptions = await response.json();
    const cart = JSON.parse(localStorage.getItem('cart'));

    const products = JSON.parse(localStorage.getItem('kamnaProducts'));
    renderOrderHtml(deliveryOptions, cart, products);
    renderPaymentSummaryHtml(deliveryOptions, cart, products)

    console.log(deliveryOptions);
  }catch(error){
    console.error(error);
  }
}