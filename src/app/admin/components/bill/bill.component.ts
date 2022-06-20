import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/user/models/bill.model';
import { runInThisContext } from 'vm';
import { AdminService } from '../../services/admin.service';
import { ViewBillComponent } from '../view-bill/view-bill.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
progress:boolean = false;
bill:Bill[] = [];
displayedColumns: string[] = ['username', 'userId', 'email', 'payment', 'totalPrice', 'actions'];
dataSource! :MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private admin:AdminService, 
    private dialog: MatDialog,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getBill();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBill(){
    this.admin.getBill().subscribe(res =>{
      this.bill = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteBill(id:number){
    this.admin.deleteBill(id).subscribe(res =>{
      this.toast.success("Order successfully deleted", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
      this.ngOnInit();
    })
  }

  getBillByUser(userId:number){
  }

  viewBill(element:Bill){
    this.dialog.open(ViewBillComponent, {
      width: '60%',
      data: element
    });
  }
}
