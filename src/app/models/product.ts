import { Url } from "url";
import { Category } from "./category";

export interface Product{
    id: string;
    title: string;
    count: number;
    countPerCustomer: number;
    photoUrl: Url;
    category: Category;
    description: string;
}

export interface ProductCreationForm{
    id: string;
    title: string;
    count: number;
    countPerCustomer: number;
    category: Category;
    description?: string;
}
