import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})

export class PublicGuard implements CanMatch, CanActivate {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  // private checkAuthStatus():boolean | Observable<boolean> {
  //   return this.authService.checkAuthentication().pipe(
  //     tap((isAuthenticated) => console.log(isAuthenticated)),
  //     tap((isAuthenticated) => {
  //       if( isAuthenticated) this.router.navigate(['./'])
  //     }),
  //     // map((isAuthenticated) => !isAuthenticated)
  //   )

  // }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => console.log(isAuthenticated)),
      tap((isAuthenticated) => {
        if( isAuthenticated) this.router.navigate(['./'])
      }),
      map((isAuthenticated) => !isAuthenticated)
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => console.log(isAuthenticated)),
      tap((isAuthenticated) => {
        if( isAuthenticated) this.router.navigate(['./'])
      }),
      map((isAuthenticated) => !isAuthenticated)
    )
  }
}
