import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from './shared/models/category.model';
import { SharedService } from './shared/services/shared.service';
import { Order } from './user/models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged:string | any = '';
  categories:Category[] = [];
  catLength:number | any;
  orders:Order[] = [];
  orderLength: number | any;


  constructor(private shared: SharedService){}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllOrders();
    this.logged = localStorage.getItem('isLogged');
  }
  title = 'cafe-management-system';

  getAllCategories(){
    this.shared.getCategories().subscribe(res =>{
      this.categories = res;
      this.catLength = this.categories.length;
    })
  }

  getAllOrders(){
    this.shared.getOrders().subscribe(res =>{
      this.orders = res;
      this.orderLength = this.orders.length;
    })
  }
  }


