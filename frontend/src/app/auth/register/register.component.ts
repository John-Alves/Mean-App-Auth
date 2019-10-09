import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
      'name': [ '', Validators.required ],
      'email': [ '', Validators.required ],
      'telephone': [ '', Validators.required ],
      'cpf': [ '', Validators.required ],
      'login': [ '', Validators.required ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'password_confirmation': [ '', [ Validators.required ] ],
    }, { validator: this.matchingPasswords }
  );

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  private matchingPasswords(group: FormGroup) {
    if (group){
      const password = group.controls['password'].value;
      const passwordConfirmation = group.controls['password_confirmation'].value;

      if (password === passwordConfirmation){
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit(){
    let user: User = { ...this.formRegister.value };
    this.authService.register(user)
      .subscribe(
        (userResponse) => {
          alert('Criado com sucesso');
          this.router.navigateByUrl('/auth/login');
        },
        (err) => {
          alert('Erro ao criar');
          console.log(err.error.message);          
        }
      )
    console.log(user);
  }

}
