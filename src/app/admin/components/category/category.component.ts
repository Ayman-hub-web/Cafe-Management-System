import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { Menu } from 'src/app/user/models/menu.model';
import { AdminService } from '../../services/admin.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  progress: boolean = false;
  categories: Category[] = [];
  menu: Menu[] = [];
  onToggleCategory: string | any;
  ontoggleChange: boolean = false;

  constructor(private admin: AdminService, private dialog:MatDialog, private toast:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.admin.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

  getMenu() {
    this.admin.getMenu().pipe(map(data => data.filter(dat => dat.category == this.onToggleCategory)))
      .subscribe(res => {
          res.forEach(element => {
            element.status = !element.status;
          });
          this.menu = res;
      });

  }
  
  onToggle(id: number) {
    this.progress = true;
    setTimeout(() => {
      this.progress = false;
    }, 500);
    this.categories[id - 1].status = !this.categories[id - 1].status;
    this.admin.updateCategory(id, this.categories[id - 1]).subscribe(res => {
      this.ngOnInit();
    });
  }

  addCategory(){
    this.dialog.open(AddCategoryComponent).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getCategories();
      }
    })
  }

  delete(id:number){
    this.admin.deleteCategory(id).subscribe(res =>{
      this.toast.success("Category deleted successfully", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
        this.ngOnInit();
    })
  }

  edit(cat:Category){
    this.dialog.open(AddCategoryComponent, {
      data: cat
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getCategories();
      }
    })
  }
}
