import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private _registerForm: FormGroup;

  constructor(private _form: FormBuilder, private _appAuthService: AppAuthService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  authExternalProvider(provider: string) {
    console.log(this._appAuthService.getExternalUrl().subscribe());
  }

  createForm() {
    this._registerForm = this._form.group({
      username: new FormControl,
      email: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });
  }

  onSubmit() {
    console.log(this._registerForm.value);
    this._appAuthService
      .register(this._registerForm.value)
      .subscribe( () => this._appAuthService.login(this._registerForm.value));
  }

}
