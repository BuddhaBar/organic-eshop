import { switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private auth: AuthService,
    private orderService: OrderService
  ) { 
    this.orders$ = this.auth.user$.pipe(switchMap(u => orderService.getOrderByUser(u.uid)));
  }

  ngOnInit(): void {
  }

}
