import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  progress: boolean = false;
  form: FormGroup | any;
  BTN:string = 'Add';

  constructor(private admin: AdminService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public cat: Category) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      status: new FormControl(true),
    });

    if (this.cat) {
      this.BTN = 'Update';
      this.form.controls['name'].setValue(this.cat.name);
    }

  }

  add() {
    if (!this.cat) {
      this.admin.addCategory(this.form.value).subscribe(res => {
        this.toast.success("Category added successfully", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        });
        this.form.reset();
        this.dialogRef.close('save');
      })
    } else {
      this.admin.updateCategory(this.cat.id, this.form.value).subscribe(res => {
        this.toast.success("Category updated successfully", "", {
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

}
