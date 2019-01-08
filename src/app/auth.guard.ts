import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private userService:UserService, private router:Router) {

  } 
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.userService.isLoggedIn);
      console.log('i am checking to see if you are logged in');
      
      if(this.userService.isLoggedIn) {
        localStorage.setItem('isLoggedIn', "true");
      }

      if(localStorage.getItem('isLoggedIn') == 'true') {
        return this.userService.isLoggedIn
      }else {
        console.log(RouterStateSnapshot);
        this.router.navigate(['/login']);
      }

  }
}
