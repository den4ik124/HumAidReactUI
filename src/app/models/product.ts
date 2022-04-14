export interface Product{
    id: string;
    title: string;
    count: number;
    description: string;
    rating? : number;
}

export interface ProductCreationForm{
    id: string;
    title: string;
    count: number;
    description?: string;
}
