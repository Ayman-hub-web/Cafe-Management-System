import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from 'src/app/user/models/order.model';
import { AdminService } from '../../services/admin.service';
import { AddOrderComponent } from '../add-order/add-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
progress:boolean = false;
orders:Order[] = [];
search:string | any;
searchForm:FormGroup | any;

displayedColumns: string[] = ['user', 'menuItem', 'amount', 'payment', 'price', 'actions'];
dataSource! :MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  constructor(private admin:AdminService, private toast: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
    this.searchForm = new FormGroup({
      search : new FormControl('')
    });
  }

  getOrders(){
    this.admin.getOrders().subscribe(res =>{
      this.orders = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteOrder(id:number){
    this.admin.deleteOrder(id).subscribe(res=>{
      this.toast.success("Order successfully deleted", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
        this.ngOnInit();
    })
  }

  editProduct(element:Order){
    this.dialog.open(EditOrderComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val =>{
      // if(val === 'save'){
      //   this.getProducts();
      // }
    })
  }

  addOrder(){
    this.dialog.open(AddOrderComponent, {
      width: '50%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getOrders();
      }
    })
  }

}
