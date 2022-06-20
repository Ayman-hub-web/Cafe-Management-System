import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './services/admin.service';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { FilterOrdersPipe } from './pipes/filter-orders.pipe';
import { BillComponent } from './components/bill/bill.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddOrderComponent } from './components/add-order/add-order.component';



@NgModule({
  declarations: [
    CategoryComponent,
    OrdersComponent,
    UsersComponent,
    MenuComponent,
    AddCategoryComponent,
    EditOrderComponent,
    FilterOrdersPipe,
    BillComponent,
    ViewBillComponent,
    EditUserComponent,
    AddProductComponent,
    AddOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers:[AdminService]
})
export class AdminModule { }
