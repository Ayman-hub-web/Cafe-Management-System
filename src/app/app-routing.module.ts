import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './user/components/board/board.component';
import { CategoryComponent } from './admin/components/category/category.component';
import { AdminGuard } from './admin/guards/admin.guard';
import { OrdersComponent } from './admin/components/orders/orders.component';
import { BillComponent } from './admin/components/bill/bill.component';
import { UsersComponent } from './admin/components/users/users.component';
import { MenuComponent } from './admin/components/menu/menu.component';
import { NavComponent } from './shared/components/nav/nav.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: BoardComponent, canActivate: [AuthGuard]},
  {path: 'admin/categories', component: CategoryComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/products', component: MenuComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/bill', component: BillComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
