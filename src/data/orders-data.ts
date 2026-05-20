import { CartItem, emptyCart } from "./cart";

export interface Order {
  orderId: string,
  orderTime: string,
  products: CartItem[],
  totalPrice: number
}

type RenderOrderHtml = (orders: Order[]) => void

export async function getOrderData(renderOrderHtml: RenderOrderHtml){
  const url = 'https://69ada80eb50a169ec87fef13.mockapi.io/orders';
  try{
    console.log('Getting orders from backend');
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const orders = data.toReversed();
    renderOrderHtml(orders);
  }
  catch(error){
    console.error(`Couldn't create order ${error}`);
  }
}

export async function createOrder(grandTotal: number) {
  const cartData = localStorage.getItem('kamnaCart') || '[]';
  const cart: CartItem[] | [] = JSON.parse(cartData);
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const orderData: Order = {
    orderId: crypto.randomUUID(),
    orderTime: new Date().toISOString(),
    products: cart,
    totalPrice: grandTotal,
  };

  try {
    console.log("confirming your order");
    const response = await fetch(
      "https://69ada80eb50a169ec87fef13.mockapi.io/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw "error";
    }

    // const order = await response.json();
    emptyCart(cart);
    localStorage.removeItem('kamnaCart');
    // console.log(order);
  } catch (error) {
    console.log(error);
  } finally {
    window.location.href = "orders.html";
  }
}
