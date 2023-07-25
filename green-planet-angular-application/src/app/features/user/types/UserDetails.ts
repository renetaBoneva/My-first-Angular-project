import { OrderProduct } from "../../products/types/OrderProduct";

export interface UserDetails {
    "_id": number,
    "email": string ,
    "password": string ,
    "firstName": string ,
    "lastName": string ,
    "address": string,
    "orders": Object[],
    "myCart": OrderProduct[]
}