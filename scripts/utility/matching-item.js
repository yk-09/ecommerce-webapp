export default function getItem(items, id){

  let matchingItem;

  items.forEach((item) => {
    if (item.id === id) {
      matchingItem = item;
    }
  });

  return matchingItem;
}
