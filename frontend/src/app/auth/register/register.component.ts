import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
      'password': [ '', Validators.required, Validators.minLength(6) ],
      'password_confirmation': [ '', Validators.required ],
    }, { validator: this.matchingPasswords }
  );

  constructor(private fb: FormBuilder) { }

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

  }

}
