import { Product } from "./product";

export interface OrderItem{
    productId: string;
    product: Product;
    productAmount: number;
    isActive : boolean;
    // totalCost: (product : Product, productAmount: number) => number;
}

export interface OrderItemDto{
    id: string;
    productAmount: number;
}
    