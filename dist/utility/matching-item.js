// 2. We tell the Generic <T> that it MUST conform to that contract
export default function getItem(items, id) {
    let matchingItem;
    items.forEach((item) => {
        if (item.id === id) {
            matchingItem = item; // TS is happy now because it guarantees 'item' has an 'id'
        }
    });
    return matchingItem;
}
//# sourceMappingURL=matching-item.js.map