import{r as e,t}from"./modulepreload-polyfill-DvoRgtBb.js";import{t as n}from"./dayjs.min-og6vcfpW.js";t((()=>{var t=e(n()),r=new URL(window.location.href),i=r.searchParams.get(`productId`),a=r.searchParams.get(`orderId`),o=localStorage.getItem(`kamnaOrders`)||`[]`,s=JSON.parse(o),c=localStorage.getItem(`kamnaProducts`)||`[]`,l=JSON.parse(c),u=localStorage.getItem(`kaamnaOptions`)||`[]`,d=JSON.parse(u),f=s.find(e=>e.orderId===a);console.log(f);var p=f?.products.find(e=>e.productId===i),m=d.find(e=>e.id===p?.deliveryOptionId);console.log(m);var h=l.find(e=>e.id===i);console.log(h);var g;if(f&&m){let e=f.orderTime;g=(0,t.default)(e).add(m.deliveryDays,`days`).format(`dddd, MMMM D`)}var _=document.querySelector(`.js-order-details`);console.log(i),console.log(a),console.log(p),v();function v(){if(!h||!f||!p||!g)return;let e=`
    <section class="order-details">
      <h1 class="delivery-headline">Arriving on ${g}</h1>
      <p class="product-title">${h.name}</p>
      <p class="product-quantity">Quantity: ${p.productQuantity}</p>
      <figure class="image-box">
        <img src=${h.image} height="100" width="100">  
      </figure>
    </section>
  `;_&&(_.innerHTML=e)}}))();