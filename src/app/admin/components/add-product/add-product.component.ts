import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category.model';
import { Menu } from 'src/app/user/models/menu.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: FormGroup | any;
  categories: Category[] = [];
  selectedValue:string | any;
  BTN:string = 'Add';
  progress:boolean = false;

  constructor(private admin: AdminService,
    private formbuilder: FormBuilder,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public element: Menu) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      item: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.getCategories();
    if (this.element) {
      this.BTN = 'Update';
      this.form.controls['item'].setValue(this.element.item);
      this.form.controls['category'].setValue(this.element.category);
      this.form.controls['price'].setValue(this.element.price);
      this.selectedValue = this.element.category;
    }

  }

  add() {
    this.progress = true;
    if (!this.element) {
      this.form.value.status = true;
      this.admin.addMenu(this.form.value).subscribe(res => {
        this.toast.success("Product added successfully", "", {
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
      this.form.value.status = true;
      this.admin.updateMenu(this.element.id, this.form.value).subscribe(res =>{
        this.toast.success("Product updated successfully", "", {
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


  getCategories() {
    this.admin.getCategories().subscribe(res => {
      this.categories = res;
    })
  }


}
