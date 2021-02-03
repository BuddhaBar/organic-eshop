import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppCategory } from 'shared/models/app-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(
      '/categories',
      unorderedList => 
      unorderedList
        .orderByChild('name'))
        .snapshotChanges().pipe(map(
          category => category.map(
            c=>({
              key: c.payload.key,
              name: (c.payload.val() as AppCategory).name
            })
          )
        ));
  }
}
