export interface Product {
    "_id": number,
    "title": string,
    "price": number,
    "category": string[],
    "imgName": string,
    "isBestSeller": boolean,
    "details": string
}