import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Bill } from 'src/app/user/models/bill.model';
import { AdminService } from '../../services/admin.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
viewBillId:number | any;
allBills: Bill[] = [];
totalEndPrice: number = 0;
userId:number | any;
@ViewChild('pdfTable')
  pdfTable!: ElementRef;
  myHtmlProperty: any;
  constructor(private admin:AdminService, @Inject(MAT_DIALOG_DATA) public element: Bill) { }

  ngOnInit(): void {
    this.viewBillId = Number(localStorage.getItem('viewBillId'));
    this.getAllBill();
  }

  getAllBill(){
    this.admin.getBill().pipe(map(x => x.filter(a => a.userId == this.element.userId)))
    .subscribe(res =>{
      this.allBills = res;
      this.allBills.forEach(element =>{
        this.totalEndPrice += element.totalPrice;
        console.log('totalPrice', this.totalEndPrice);
      })
    });
  }

}
