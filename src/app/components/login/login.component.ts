import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginForm: FormGroup;

  constructor(private _form: FormBuilder, private authService: AppAuthService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this._loginForm = this._form.group({
      username: new FormControl,
      password: new FormControl,
    });
  }

  onSubmit(){
    this.authService.login(this._loginForm.value);
  }

}
