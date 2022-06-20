import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/shared/models/category.model';
import { Menu } from 'src/app/user/models/menu.model';
import { AdminService } from '../../services/admin.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  progress:boolean = false;
  products:Menu[] = [];
  displayedColumns: string[] = ['item', 'category', 'price','actions'];
  dataSource! :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private admin:AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct(){
    this.dialog.open(AddProductComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getProducts();
      }
    })
  }

  getProducts(){
    this.admin.getMenu().subscribe(res =>{
      this.products = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onToggle(id: number) {
    this.progress = true;
    setTimeout(() => {
      this.progress = false;
    }, 500);
    this.products[id - 1].status = !this.products[id - 1].status;
    this.admin.updateMenu(id, this.products[id - 1]).subscribe(res => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editMenu(element:Menu){
    this.dialog.open(AddProductComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getProducts();
      }
    })
  }

}
