import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { OrderComponent } from 'src/app/user/components/order/order.component';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  user: User | any;
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

  }
  logout() {
    localStorage.removeItem('isLogged');
    this.router.navigate(['/'], { relativeTo: this.route }).then(() => {
      window.location.reload();
    })
  }
  addOrder() {
    this.dialog.open(OrderComponent);
  }
}
