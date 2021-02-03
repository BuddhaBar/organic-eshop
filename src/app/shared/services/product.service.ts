import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private router: Router, private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/products').snapshotChanges()
    .pipe(map(products => products.map(
      p=>({
        key : p.payload.key,
        title : (<Product>p.payload.val()).title,
        price: (<Product>p.payload.val()).price,
        category: (<Product>p.payload.val()).category,
        imageUrl: (<Product>p.payload.val()).imageUrl
      })
    )))
      
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/'+productId).update(product);
  }

  save(product) {
    this.db.list('/products').push(product);
    this.router.navigate(['/admin/products']);
  }

  delete(productId) {
    this.db.object('/products/'+productId).remove();
  }
}
