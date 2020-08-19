import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AuthService } from 'src/app/core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  /**
   * Guard deciding if a route can be activated.
   *
   * @param next Route snapshot.
   * @param state Route state snapshot.
   *
   * @returns Observable<boolean> | Promise<boolean> | boolean value that indicates if a route can be activated.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    } else {
      return true;
    }
  }

}
