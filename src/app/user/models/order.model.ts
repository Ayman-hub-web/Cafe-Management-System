export interface Order{
    id?:number,
    user:string,
    menuItem:string,
    payment:string,
    amount: number,
    price: number
}