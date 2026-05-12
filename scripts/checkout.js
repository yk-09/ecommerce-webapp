import { renderOrderHtml } from './checkout/order.js ';
import { renderPaymentSummaryHtml } from './checkout/payment.js';

// export async function fetchAllData(){
//   const urls = [
//     'https://69d1185f90cd06523d5dd7c7.mockapi.io/cart',
//     'https://69ada80eb50a169ec87fef13.mockapi.io/products',
//     'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options'
//   ];

//   try{
//     const responsePromises = urls.map(url => fetch(url));

//     const responses = await Promise.all(responsePromises);

//     const data = await Promise.all(responses.map(res => {
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       return res.json();
//     }));

//     console.log('All data fetched:', data);
//     renderOrderHtml(data);
//     renderPaymentSummaryHtml(data);
//     const [cart, products, deliveryOptions] = data;
//     localStorage.setItem('KamnaProducts', JSON.stringify(products));
//     localStorage.setItem('KamnaOptions', JSON.stringify(deliveryOptions));
//   }
//   catch(error){
//     console.error('One or more fetches failed:', error);
//   }
// };


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