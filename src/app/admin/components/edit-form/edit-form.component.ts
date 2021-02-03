import { CategoryService } from 'shared/services/category.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  id;
  subscription: Subscription;
  product: Product;
  categories$;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
    ) { 
    this.categories$ = this.categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getProduct(this.id).subscribe(p => this.product=<Product>p);
  
  }

  ngOnInit(): void {
  }
  save(product) {
    this.productService.update(this.id,product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are yout sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
