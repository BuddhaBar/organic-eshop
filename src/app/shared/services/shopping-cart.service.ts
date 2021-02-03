import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

   sub: Subscription;
  
  constructor(private db: AngularFireDatabase) { 
  }

  async getCart(): Promise<Observable<ShoppingCart>>  {
    let cartId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/'+ cartId).valueChanges()
    .pipe(map(x => new ShoppingCart((<any>x).items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, +1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);

  }

  private create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key)
    return result.key;
  }

  async insertInCart(product: Product) {
    let cartId = await this.getOrCreateId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1))
    .subscribe(() => {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        })
      })
    }
    private async updateItem(product: Product, change: number) {
      let cartId = await this.getOrCreateId();
      let item$ = this.getItem(cartId, product.key);
      item$.valueChanges().pipe(take(1))
      .subscribe(item => {
          let quantity = (<ShoppingCartItem>item).quantity + change;
          if(quantity === 0) item$.remove();
          
          else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        })
      })
      }
  }

