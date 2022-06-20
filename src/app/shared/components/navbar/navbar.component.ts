import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(LoginComponent);
  }
  openDialogRegister(){
    this.dialog.open(RegisterComponent);
  }
  

}
