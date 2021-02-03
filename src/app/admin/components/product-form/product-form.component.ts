import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  product : Product;
  id
  categories$;
  urlRegex=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  productForm = new FormGroup({
    'title': new FormControl('', Validators.required),
    'price': new FormControl('', [Validators.required, Validators.min(1)]),
    'category': new FormControl('', Validators.required),
    'imageUrl': new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
  })


  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private productService: ProductService ,
      private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getProduct(this.id).subscribe(p => this.product=<Product>p);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get category() {
    return this.productForm.get('category');
  }
  get imageUrl() {
    return this.productForm.get('imageUrl');
  }
  save(product) {
    this.productService.save(product);

    this.router.navigate(['/admin/products']);
  }

  
}
