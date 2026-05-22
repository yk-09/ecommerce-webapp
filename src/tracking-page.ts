console.log('hello');

const url = new URL(window.location.href);
const searchParams = url.searchParams;
console.log(searchParams.get('orderId'));
console.log(searchParams.get('productId'));