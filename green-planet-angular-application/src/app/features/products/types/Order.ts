import { OrderProduct } from "./OrderProduct";


export interface Order {    
    "_id": string,
    "orderNumber": number,
    "ownerId": number,
    "madeOnDate": string,
    "address":string,
    "products": OrderProduct[]
    "total": number
}

