import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { Category } from 'src/app/shared/models/category.model';
import { Bill } from 'src/app/user/models/bill.model';
import { Menu } from 'src/app/user/models/menu.model';
import { Order } from 'src/app/user/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  updateCategory(id:number | any, category:Category):Observable<Category>{
    return this.http.put<Category>('http://localhost:3000/categories/'+id, category);
  }

  addMenu(menu:Menu):Observable<Menu[]>{
    return this.http.post<Menu[]>('http://localhost:3000/menu', menu)
  }

  getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>('http://localhost:3000/menu');
  }

  updateMenu(id:any, menu:Menu):Observable<Menu>{
    return this.http.put<Menu>('http://localhost:3000/menu/'+id, menu)
   }

   addCategory(category:Category):Observable<Category>{
     return this.http.post<Category>('http://localhost:3000/categories', category);
   }

   deleteCategory(id:number):Observable<Category>{
     return this.http.delete<Category>('http://localhost:3000/categories/'+id);
   }

   getOrders():Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:3000/orders');
   }

   deleteOrder(id:number):Observable<Order>{
     return this.http.delete<Order>('http://localhost:3000/orders/'+id);
   }

   getBill():Observable<Bill[]>{
     return this.http.get<Bill[]>('http://localhost:3000/bill');
   }

   deleteBill(id:number):Observable<Bill>{
    return this.http.delete<Bill>('http://localhost:3000/bill/'+id);
  }

   getUserById(id:number):Observable<Bill>{
     return this.http.get<Bill>('http://localhost:3000/users/'+id);
   }

   getUsers():Observable<User[]>{
     return this.http.get<User[]>('http://localhost:3000/users');

   }

    deleteUser(id:number):Observable<User>{
      return this.http.delete<User>('http://localhost:3000/users/'+id)
    }

    updateUser(id:any, user:User):Observable<User>{
      return this.http.put<User>('http://localhost:3000/users/'+id, user)
    }

   isAdmin(){
    let user =  JSON.parse(localStorage.getItem('user')!);
    if(user.role == 'admin'){
      return true;
    }
    return false;
  }
}
