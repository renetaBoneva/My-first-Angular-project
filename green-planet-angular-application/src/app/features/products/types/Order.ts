import { OrderProduct } from "./OrderProduct";


export interface Order {    
    "_id": number,
    "orderNumber": number,
    "ownerId": number,
    "madeOnDate": string,
    "address":string,
    "products": OrderProduct[]
    "total": number
}

