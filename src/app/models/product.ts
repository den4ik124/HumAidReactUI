export interface Product{
    id: string;
    title: string;
    price: number;
    description: string;
    rating? : number;
}

export interface ProductCreationForm{
    id: string;
    title: string;
    price: number;
    description?: string;
}
