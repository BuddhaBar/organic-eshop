import { UserService } from './user.service';
import { AppUser } from 'shared/models/appuser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ =  this.afAuth.authState;
   }

   login() {
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl',returnUrl);
     this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
   }

   logout() {
     this.afAuth.signOut();
   }
   
   get appUser$() :Observable<AppUser> {
     return this.user$.pipe(switchMap(user=>{
       if(user) return this.userService.get(user.uid).valueChanges()
     
       return of(null);
      }
     ))
   }
}
