import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import OrderItemStore from "./orderItemsStore";
import ProductStore from "./productStore";
import RoleStore from "./roleStore";
import UserStore from "./userStore";

interface Store{
    commonStore : CommonStore
    userStore : UserStore
    productStore: ProductStore
    categoryStore: CategoryStore
    roleStore: RoleStore
    orderItemStore: OrderItemStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    roleStore: new RoleStore(),
    orderItemStore: new OrderItemStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}

