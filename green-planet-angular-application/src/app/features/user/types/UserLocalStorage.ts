import { OrderProduct } from "../../products/types/OrderProduct";
export interface UserLocalStorage {
    "_id": number,
    "email": string ,
    "myCart": OrderProduct[]
}