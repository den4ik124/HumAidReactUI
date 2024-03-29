import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product, ProductCreationForm } from "../models/product";
import {v4 as uuid} from 'uuid';

export default class ProductStore{
    product: Product | null = null;
    products: Product[] = [];
    productsCount: number = 0;

    constructor(){
        makeAutoObservable(this)
    }

    get isProductsInCart(){
        return this.products.length > 0;
    }

    getProducts = async (categoryName : string) => {
        try{
            const products = await agent.Products.list(categoryName);
            this.productsCount = products.length;
            runInAction(()=>this.products = products);
        }catch (error){
            console.log(error);
            throw error;
        }
    }

    createProduct = async ( product : ProductCreationForm) => {
        try {
            product.id = uuid();            
            await agent.Products.add(product);            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    editProduct = async (product : Product) => {
        try {
            await agent.Products.edit(product); 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    removeProduct = async (id : string) => {
        try{
            await agent.Products.remove(id);
        } catch (error){
            console.log(error);
        };
    }

}
