import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

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
    this.authService.adminLogin(this._loginForm.value);
  }
}