import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import OrderItemStore from "./orderItemsStore";
import ProductStore from "./productStore";
import RoleStore from "./roleStore";
import UserStore from "./userStore";

interface Store{
    commonStore : CommonStore
    userStore : UserStore
    productStore: ProductStore
    roleStore: RoleStore
    orderItemStore: OrderItemStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    productStore: new ProductStore(),
    roleStore: new RoleStore(),
    orderItemStore: new OrderItemStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}

