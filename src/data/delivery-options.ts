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
    saveToStorage(deliveryOptions);
    return deliveryOptions;

  } catch(error) {
    console.error(error);
  } finally {
    // end loading state and make other changes
  }
};

function saveToStorage(deliveryOptions: DeliveryOption[]): void{
  localStorage.setItem('kaamnaOptions', JSON.stringify(deliveryOptions));
};