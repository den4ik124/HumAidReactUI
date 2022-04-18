import axios, { AxiosError, AxiosResponse } from "axios";
import { OrderItem } from "../models/orderItem";
import { Product, ProductCreationForm } from "../models/product";
import { Role, RoleFormValues } from "../models/role";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import {toast} from 'react-toastify'
import { history } from "../..";
import { Category } from "../models/category";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.baseURL = "https://humanitarianaidapi.azurewebsites.net"

axios.interceptors.request.use(config =>{
    config.withCredentials = true;
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(500);
        return response;
},async (error : AxiosError) => {
    
    if(typeof error.response === 'undefined'){
        toast.error(error.message);
        history.push('/error/network-error')
    }
    else{
        const {data, status, config} = error.response!;
        switch (status) {
            case 400:
                if(typeof data === 'string') {
                    toast.error(data);
                }
                if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                    history.push('/error/NotFound');
                }

                errorsHandling(data);
                break;
        
            case 401:
                toast.error('Unauthorized');
                await sleep(2000);
                history.push('/')
                break;

            case 403:
                toast.error('Access denied');
                await sleep(2000);
                history.goBack();
                break;
        
            case 404:
                toast.error('not founded');
                history.push('/error/NotFound')
                break;

            case 500:
                store.commonStore.setServerError(data);
                history.push('/error/server-error')
                break;

            default:
                break;
        }
    }

    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete:<T> (url: string) => axios.delete<T>(url).then(responseBody),
}


const Users = {
    list: () => requests.get<User[]>('/account/users'),
    addRoles: (userName: string, roles : string[]) => requests.put<void>(`/Roles/addRoles_${userName}`, roles),
    removeRole: (userName: string, role : string[]) => requests.put<void>(`/Roles/removeRole_${userName}`, role)
}

const Products ={
    list: (categoryName : string) => requests.get<Product[]>(`/shop/get/${categoryName}`),
    add: (product : ProductCreationForm) => requests.post<void>('/Shop', product),
    remove: (id : string) => requests.delete<void>(`/Shop/${id}`),
    edit: (product : Product) => requests.put<void>(`/Shop/product_id${product.id}`, product)
}

const Categories ={
    list: () => requests.get<Category[]>('/categories'),
    add: (categoryName: string) => requests.post<void>(`/categories/add_${categoryName}`, categoryName),
    remove: (categoryId : number) => requests.delete<void>(`/categories/${categoryId}`),
}

const Order = {
    create: (order : OrderItem[]) => requests.post<void>('/shop/createOrder', order),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    logout: () => requests.get<void>('/account/logout'),

    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    googleLogin: () => requests.get<User>(`/account/googleSignIn`),
    googleLoginTest: (tokenId : string) => requests.post<void>(`/account/googleSignIn/${tokenId}`, tokenId),
}

const Roles ={
    list: () => requests.get<Role[]>('/roles'),
    add: (role : RoleFormValues) => requests.post<void>('/roles/AddRole', role),
    remove: (roleId : string) => requests.delete<void>(`/roles/delete/${roleId}`),
}

const agent ={
    Account,
    Categories,
    Order,
    Products,
    Roles,
    Users,
}

export default agent;

function errorsHandling(data: any) {
    if (data.errors) {
        const modalStateErrors = [];
        for (let key in data.errors) {
            if (data.errors[key]) {
                modalStateErrors.push(data.errors[key]);
            }
        }
        throw modalStateErrors.flat();
    }
}
