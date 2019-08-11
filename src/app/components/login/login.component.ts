import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginForm: FormGroup;

  constructor(private _form: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this._loginForm = this._form.group({
      userName: new FormControl,
      password: new FormControl,
    })
  }

  onSubmit(){
    console.log(this._loginForm.value);
  }

}
