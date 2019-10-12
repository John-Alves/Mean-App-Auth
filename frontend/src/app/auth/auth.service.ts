import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../constants';
import { User } from './user';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = CONSTANTS.apiUrl;

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private userIsLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.api}/register`, user);
  }

  login(credentials: { login: String, password: String } ): Observable<User>{
    return this.http
      .post<User>(`${this.api}/login`, credentials)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('token', user.token);

          this.userIsLoggedIn$.next(true);
          this.currentUser$.next(user);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.userIsLoggedIn$.value) {
      return this.tokenValidation();
    }
    return this.userIsLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  logout(){
    localStorage.removeItem('token');

    this.userIsLoggedIn$.next(false);
    this.currentUser$.next(null);
  }

  private tokenValidation(): Observable<boolean>{
    return this.http
      .get<User>(`${this.api}/user`)
      .pipe(
        tap((user: User) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUser$.next(user);
            this.userIsLoggedIn$.next(true);
          }
        }),
        catchError((error: any) => {
          this.logout();
          return of(false);
        }),
        map((user: User) => (user) ? true : false )
      );
  }
}
