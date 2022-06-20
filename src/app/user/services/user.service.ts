import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { Menu } from '../models/menu.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>('http://localhost:3000/menu');
  }

  updateMenu(id:number, item:Menu):Observable<Menu>{
    return this.http.put<Menu>('http://localhost:3000/menu/'+id, item);
  }
  
  getMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>('http://localhost:3000/menu/'+id);
  }

  getPaymentsMethods():Observable<any>{
    return this.http.get<any>('http://localhost:3000/pay-methods');
  }

  addOrder(order:Order):Observable<Order>{
    return this.http.post<Order>('http://localhost:3000/orders', order);
  }

  addBill(bill:Bill):Observable<Bill>{
    return this.http.post<Bill>('http://localhost:3000/bill', bill);
  }

}
