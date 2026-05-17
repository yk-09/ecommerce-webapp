// 1. We define a baseline contract for any item that has an ID
interface Identifiable {
  id: string;
}

// 2. We tell the Generic <T> that it MUST conform to that contract
export default function getItem<T extends Identifiable>(
  items: T[], 
  id: string
): T | undefined { // 3. Return type is the specific type T, or undefined if not found
  
  let matchingItem: T | undefined;

  items.forEach((item) => {
    if (item.id === id) {
      matchingItem = item; // TS is happy now because it guarantees 'item' has an 'id'
    }
  });

  return matchingItem;
}