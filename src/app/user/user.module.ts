import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { BoardComponent } from './components/board/board.component';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    OrderComponent,
    BoardComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule

  ],
  providers:[UserService]
})
export class UserModule { }
