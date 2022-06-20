import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from '../auth/components/login/login.component';
import { AuthModule } from '../auth/auth.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DashboardComponent } from '../dashboard/components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { SideComponent } from './components/side/side.component';
import { SharedService } from './services/shared.service';



@NgModule({
  declarations: [
    NavbarComponent,
    NavComponent,
    SideComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot() 
  ],
  exports:[
    NavbarComponent,
    MaterialModule,
    ToastrModule,
    NavComponent,
    SideComponent
  ],
  providers:[SharedService]
})
export class SharedModule { }
