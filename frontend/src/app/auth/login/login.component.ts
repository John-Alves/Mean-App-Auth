import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    'login': ['', [ Validators.required ]],
    'password': ['', [ Validators.required, Validators.minLength(6) ]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(credentials)
      .subscribe(
        user => {
          this.snackBar.open("Logado com sucesso.", "OK", { duration: 2000 });
          this.loading = false;
          this.router.navigateByUrl('/');
        },
        (exception: any) => {
          this.loading = false;
          this.snackBar.open(exception.error.message, "OK", { duration: 2000 });
        }
      )
  }

}
