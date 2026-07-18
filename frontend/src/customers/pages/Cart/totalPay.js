export const cartTotal=(items)=>{
   const total = items.reduce((acc, item) => item.totalPrice + acc, 0);
   return Math.round(total * 100) / 100;
}