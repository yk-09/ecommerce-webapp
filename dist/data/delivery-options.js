export async function getDeliveryOptions() {
    try {
        console.log('loading...');
        const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options';
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Unexpected error! HTTP status: ${response.status}-${response.statusText}`);
        }
        const deliveryOptions = await response.json();
        console.log(deliveryOptions);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        // end loading state and make other changes
    }
}
;
//# sourceMappingURL=delivery-options.js.map