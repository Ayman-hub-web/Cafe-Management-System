import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  progress: boolean = false;
  submitted:boolean = false;

  constructor(private auth: AuthService, 
    private toast: ToastrService, 
    private router: Router, 
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    this.auth.getAllUsers().subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if (user) {
        this.progress = true;
        setInterval(() => {
          this.progress = false;

        }, 1000);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLogged', 'logged');
        this.dialog.closeAll();
        this.router.navigate(['/user'], { relativeTo: this.route }).then(() => {
          window.location.reload();
        });
      } else {
        this.toast.error("invalid username or password", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
      }
    })
  }
}
