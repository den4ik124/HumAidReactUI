import { makeAutoObservable } from "mobx";
import { Product } from "../models/product";
import { OrderItem, OrderItemDto } from "../models/orderItem";

export default class OrderItemStore{
    orderItem: OrderItem | null = null;
    orderItems: OrderItem[] = [];
    // orderItemsDto: OrderItemDto[] = [];

    constructor(){
        makeAutoObservable(this)
    }


    createOrderItem = ( product : Product) => {
        try {
            this.orderItem = {
                productId : product.id,
                product : product,
                productAmount : 1,
                isActive: true,
            };
            var itemIndex = this.orderItems.findIndex((item) => (this.orderItem!.productId === item.productId));
            if(itemIndex > -1){
                this.orderItems[itemIndex].productAmount ++;
            }
            else{
                this.orderItems.push(this.orderItem);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getTotalCost = () => {
        var totalCost = 0;
        
        for (let index = 0; index < this.orderItems.length; index++) {
            if(this.orderItems[index].isActive){
                totalCost += this.orderItems[index].productAmount;
            }
        }
        return totalCost;
    }

}
