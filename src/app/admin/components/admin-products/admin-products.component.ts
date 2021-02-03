import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource;
  displayedColumns: string[] = ['imageUrl','title','price','action'];

  subscription: Subscription;

  constructor(private pS : ProductService) {
    this.subscription = this.pS.getAll()
    .subscribe(products => {
      this.dataSource = new MatTableDataSource<Product>(products);
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
   }

   search(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

  ngOnInit(): void {
  }

}
