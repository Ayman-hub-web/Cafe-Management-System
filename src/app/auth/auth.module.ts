import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    ToastrModule.forRoot() 
  ],
  providers:[AuthService, ToastrService]
})
export class AuthModule { }
