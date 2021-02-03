import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppinCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.shoppinCartService.clearCart();
    return result;
  }

  getOrder(orderId) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  getOrderByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges().pipe(map(orders => orders.map(o =>({
      key : o.payload.key,
      datePlaced: (<Order>o.payload.val()).datePlaced,
      items: (<Order>o.payload.val()).items,
      shipping: (<Order>o.payload.val()).shipping,
      userId: (<Order>o.payload.val()).userId
    }))));
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(orders => orders.map(o =>({
      key : o.payload.key,
      datePlaced: (<Order>o.payload.val()).datePlaced,
      items: (<Order>o.payload.val()).items,
      shipping: (<Order>o.payload.val()).shipping,
      userId: (<Order>o.payload.val()).userId
    }))));
  }
}
