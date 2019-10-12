import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth/user';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.currentUser$ = this.authService.getUser();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
