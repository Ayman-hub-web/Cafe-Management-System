import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { Category } from 'src/app/shared/models/category.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Bill } from '../../models/bill.model';
import { Menu } from '../../models/menu.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  selected = 'Choose';
  menu:Menu[] = [];
  loggedUser:User | any;
  payMethods: any[] = [];
  myForm: FormGroup | any;
  progress:boolean = false;
  submitted:boolean = false;
  choose:boolean = false;
  price:number = 0;
  fixPrice: number = 0;
  amount:number | any;
  bill:Bill | any;
  actUser: User | any;
  categories:Category[] = [];

  constructor(private user: UserService, 
    private toastr:ToastrService, 
    private dialog: MatDialog, 
    private router: Router, 
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getMenu();
    this.getPayments();
    this.myForm = new FormGroup({
      user : new FormControl(this.loggedUser.name),
      menuItem : new FormControl('', Validators.required),
      amount : new FormControl('', Validators.required),
      payment : new FormControl('', Validators.required),
      price: new FormControl(this.price)
    });

    this.actUser = JSON.parse(localStorage.getItem('user')!);
    console.log('actUser', this.actUser);
  }

    // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  getMenu(){
    this.user.getMenu().pipe(map(data => data.filter(dat => dat.status == true)))
    .subscribe(res =>{
      this.menu = res;
    });
    this.loggedUser = JSON.parse(localStorage.getItem('user')!);
  }

  getPayments(){
    this.user.getPaymentsMethods().subscribe(res =>{
      this.payMethods = res;
    })
  }

 add(){
   this.addBill();
   this.submitted = true;
  this.progress = true;
  setTimeout(() => {
    this.progress = false;
    this.dialog.closeAll();
  }, 500);
   this.user.addOrder(this.myForm.value).subscribe(res =>{
    this.toastr.success("Order added successfully", "", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut: 5000,
      closeButton: true,
    });
    setTimeout(() => {
      this.route.params.subscribe(val => {
        window.location.reload()
      });
      // this.router.navigate(['/user'], {relativeTo:this.route}).then(()=>{
        
      // })
    }, 1000);
    
   })

 }


 getPrice(id:any){
   this.choose = true;
  console.log("choose ID", id);
  this.user.getMenuById(id).subscribe(res =>{
    this.fixPrice = res.price;
    this.amount= 1;
    this.price = this.fixPrice;
  });

 }

 changePrice(amount:number){
   this.price = this.fixPrice*amount;
 }

 addBill(){
  let username = JSON.parse(localStorage.getItem('user')!).name;
  console.log('loggedUser', username);
   this.bill = {
     username: JSON.parse(localStorage.getItem('user')!).name,
     email: JSON.parse(localStorage.getItem('user')!).email,
     totalPrice: this.myForm.value.price,
     payment: this.myForm.value.payment,
     product: this.myForm.value.menuItem,
     userId: Number(this.actUser.id)
   };

   this.user.addBill(this.bill).subscribe(res =>{

   });
 }

}
