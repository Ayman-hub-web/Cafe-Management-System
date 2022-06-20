import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/models/user.model';
import { AdminService } from '../../services/admin.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  progress:boolean = false;
  users:User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role','actions'];
  dataSource! :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private admin:AdminService, 
    private toast:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.admin.getUsers().subscribe(res =>{
      this.users = res;
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
    this.users[id - 1].status = !this.users[id - 1].status;
    this.admin.updateUser(id, this.users[id - 1]).subscribe(res => {
      this.ngOnInit();
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteUser(id:number){
    this.admin.deleteUser(id).subscribe(res =>{
      this.toast.success("User successfully deleted", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
        this.ngOnInit();
    })
  }

  editUser(element:User){
    this.dialog.open(EditUserComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getUsers();
      }
    })
  }
}
