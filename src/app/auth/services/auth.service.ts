import { environments } from 'src/environments/environments';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User


  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, pass: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( (user: User) => this.user = user),
      tap( user => localStorage.setItem('token', 'asdafdf.sdfsdferq23.324324'))
    )
  }

  checkAuthentication(): Observable<boolean>{
    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user => this.user = user ),
      map( user => !!user ),
      catchError( err => of(false) )
    );
  }


  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }



}
