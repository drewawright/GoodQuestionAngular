import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { AppAuthService } from '../../services/app-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private _registerForm: FormGroup;

  constructor(private _form: FormBuilder, private _appAuthService: AppAuthService, private _router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    this._appAuthService.getExternalUrl();
  }

  authExternalProvider() {
    window.open(`https://musicqeary.azurewebsites.net${this._appAuthService.externalLoginUrl}`, "Authenticate Account", "location=0,status=0,width=600,height=750");
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
