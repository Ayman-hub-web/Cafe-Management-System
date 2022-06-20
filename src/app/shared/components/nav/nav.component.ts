import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { Menu } from 'src/app/user/models/menu.model';
import { Order } from 'src/app/user/models/order.model';
import { setInterval } from 'timers';
import { Category } from '../../models/category.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
categories:Category[] = [];
users:User[] = [];
menu:Menu[] = [];
@Input() catLength: number | any;
@Input() orderLength: number | any;

  constructor(private shared: SharedService) {
   }

  ngOnInit(): void {
    // this.getAllCategories();
    this.getAllUsers();
    this.getAllMenu();
  }

  // getAllCategories(){
  //   this.shared.getCategories().subscribe(res =>{
  //     this.categories = res;
  //   })
  // }

  getAllUsers(){
    this.shared.getUsers().subscribe(res =>{
      this.users = res;
    })
  }

  getAllMenu(){
    this.shared.getMenu().subscribe(res =>{
      this.menu = res;
    })
  }

  
}
