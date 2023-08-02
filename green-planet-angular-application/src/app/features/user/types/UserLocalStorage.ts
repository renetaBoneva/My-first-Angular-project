import { OrderProduct } from "../../products/types/OrderProduct";
export interface UserLocalStorage {
    "_id": number,
    "myCart": OrderProduct[]
    "accessToken": string,
}