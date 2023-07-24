export interface UserDetails {
    "_id": number,
    "email": string ,
    "password": string ,
    "firstName": string ,
    "lastName": string ,
    "address": string,
    "orders": Object[],
    "myCart": Object[]
}