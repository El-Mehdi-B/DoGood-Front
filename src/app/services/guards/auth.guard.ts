import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedRoute: string[]= ['main','create','about','describe',''];
  notLoggedRoute: string[]= ['login','register'];

  authService: AuthService;
  router: Router;
  constructor(authService: AuthService, router: Router){
    this.authService=authService;
    this.router=router;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    let isLogged:Boolean = this.authService.isLogged();
    let target:string  = next.url[0].path

    if(isLogged){
      for(let item of this.loggedRoute){
        if(item==target){
          return true;
        }
      }
      this.router.navigateByUrl('main');
      return false;
    }
    else{
      for(let item of this.notLoggedRoute){
        if(item==target){
          return true;
        }
      }
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
