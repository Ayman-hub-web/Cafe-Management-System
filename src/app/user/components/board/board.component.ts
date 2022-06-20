import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Menu } from '../../models/menu.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  menu: Menu[] = [];
  checked:boolean = true;
  editMenu:Menu | any;
  progress:boolean = false;
  search:string | any;
  searchForm:FormGroup | any;
  filteredData: Menu[] = [];
  displayedColumns: string[] = ['item', 'category', 'price', 'status'];
  dataSource! :MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.getAllMenu();
    this.searchForm = new FormGroup({
      search : new FormControl('')
    });
  }

  getAllMenu(){
    this.user.getMenu()
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggle(id:number){
    this.progress = true;
    setTimeout(() => {
      this.progress = false;

    }, 500);
     this.menu[id-1].status = !this.menu[id-1].status;
    this.user.updateMenu(id, this.menu[id-1]).subscribe(res =>{
      this.ngOnInit();
    });
  }

  doSearch(){
    console.log(this.search);
  }

}
