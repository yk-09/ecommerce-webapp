export declare function addToHart(productId: string, productQuantity: number): void;
export declare function getCartBackend(productQuantity?: number, productId?: string): Promise<void>;
export interface CartItem {
    productId: string;
    productQuantity: number;
    deliveryOptionId: string;
    readonly id: string;
}
export declare function updateCartQuantity(cart: CartItem[]): number;
//# sourceMappingURL=cart.d.ts.map