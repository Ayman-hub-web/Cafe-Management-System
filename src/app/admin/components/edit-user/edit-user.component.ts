import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/models/user.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
form:FormGroup | any;
  constructor(private formbuilder: FormBuilder, 
    private admin: AdminService,
    @Inject(MAT_DIALOG_DATA) public element: User,
    private toast:ToastrService,
    private dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if(this.element){
    this.form.controls['name'].setValue(this.element.name);
    this.form.controls['email'].setValue(this.element.email);
    this.form.controls['password'].setValue(this.element.password);
    }
  }

  updateUser(){
    this.form.value.role = 'user';
    this.form.value.status = this.element.status;
    this.form.value.confirmPassword = this.form.value.password;
    this.admin.updateUser(this.element.id, this.form.value).subscribe(res =>{
      this.toast.success("User updated successfully", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
      this.form.reset();
      this.dialogRef.close('save');
    })
  }

}
