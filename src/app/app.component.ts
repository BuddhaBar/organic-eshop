import { UserService } from 'shared/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-eshop';

  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
    ) {
    this.auth.user$.subscribe(user => {
      if(!user) return;
      
      this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
        
    });
  }
}
