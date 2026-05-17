import { CartItem } from "./cart";
import { Product } from "../homepage";
import { renderCartSummary } from '../checkout/order';

export interface DeliveryOption {
  readonly id: string,
  deliveryDays: number,
  shippingCost: number
}

export async function getDeliveryOptions(){
  try{
    console.log('loading...');
    const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options';
    const response = await fetch(url);

    if(!response.ok){
      throw Error(`Unexpected error! HTTP status: ${response.status}-${response.statusText}`);
    }

    const deliveryOptions: DeliveryOption[] = await response.json();
    console.log(deliveryOptions);


    const cartData = localStorage.getItem('kamnaCart') || '[]';
    const cart: CartItem[] = JSON.parse(cartData);
    
    const productsData = localStorage.getItem('kamnaProducts') || '[]';
    const products: Product[]  = JSON.parse(productsData);
    renderCartSummary(deliveryOptions, cart, products);

  } catch(error) {
    console.error(error);
  } finally {
    // end loading state and make other changes
  }
};