import { Order } from "../../products/types/Order";
import { OrderProduct } from "../../products/types/OrderProduct";

export interface UserDetails {
    "_id": string,
    "_ownerId": string,
    "email": string ,
    "firstName": string ,
    "lastName": string ,
    "address": string,
    "myOrders": Order[],
    "myCart": OrderProduct[]
}