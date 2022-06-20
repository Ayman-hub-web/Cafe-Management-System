import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;
  logged: string = '';
  progress:boolean = false;
  constructor(private dialog: MatDialog, private auth: AuthService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl('user')
    });
    
  }

  register() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      this.progress = true;
        setTimeout(() => {
          this.progress = false;

        }, 1000);
      this.logged = 'logged';
      localStorage.setItem('isLogged', this.logged);
      localStorage.setItem('user', JSON.stringify(this.form.value));
      this.auth.addUser(this.form.value).subscribe(res => {
        this.dialog.closeAll();
        this.router.navigate(['user'], {relativeTo: this.route}).then(()=>{
          window.location.reload();
        })
      });
    } else {
      this.toast.error("there is an error", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
      
    }
  }

}
