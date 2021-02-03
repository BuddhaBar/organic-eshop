import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  order: Order;
  subscription: Subscription;
  id: string;
  
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.orderService.getOrder(this.id).subscribe(o => this.order=<Order>o);
  }

}
