import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,

  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products', 
        component: ProductsComponent,
      },
      {
        path: 'shopping-cart', 
        component: ShoppingCartComponent
      },
      {
        path: 'check-out', 
        component: CheckOutComponent,
      },
      {
        path: 'order-success/:id', 
        component: OrderSuccessComponent,
      },
      {
        path: 'my-orders', 
        component: MyOrdersComponent,
      },
    ])
  ]
})
export class ShoppingModule { }
