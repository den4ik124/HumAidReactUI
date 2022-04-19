import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Category } from "../models/category";

export default class CategoryStore{
    category: Category | null = null;
    categories: Category[] = [];
    categoriesCount: number = 0;

    constructor(){
        makeAutoObservable(this)
    }

    getCategories = async () => {
        try{
            const categories = await agent.Categories.list();
            this.categoriesCount = categories.length;
            runInAction(() => this.categories = categories);
        }catch (error){
            console.log(error);
            throw error;
        }
    }

    createCategory = async ( categoryName : string) => {
        try {
            await agent.Categories.add(categoryName);            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    removeCategory = async (categoryId : number) => {
        try{
            await agent.Categories.remove(categoryId);
        } catch (error){
            console.log(error);
        };
    }

}
