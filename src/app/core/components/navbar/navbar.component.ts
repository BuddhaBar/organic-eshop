import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/appuser';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser : AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
    ) {
      
    }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
