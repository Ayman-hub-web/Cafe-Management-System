import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { Menu } from 'src/app/user/models/menu.model';
import { Order } from 'src/app/user/models/order.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>('http://localhost:3000/menu');
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:3000/orders');
  }
}
