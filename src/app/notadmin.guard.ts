import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from './model/employee';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotadminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem("token");
      const user: Employee = this.auth.getDecodedAccessToken(token?token:"");
      if (!token) this.router.navigate(["/signin"]);
      if (user.role == "Experience manager") {
        this.router.navigate(["/admin/home"]);
      }
    return true;
  }
  
  constructor(private auth: AuthService, private router: Router) {}

}
