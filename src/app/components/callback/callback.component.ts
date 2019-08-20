import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { TokenRequest } from 'src/app/models/TokenRequest';
import { AppAuthService } from 'src/app/services/app-auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})

export class CallbackComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  _registerForm: FormGroup;
  code:string;
  
  constructor(private _activatedRoute: ActivatedRoute, private _AuthService: AppAuthService, private _router: Router, private _form: FormBuilder, ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => console.log(routeData.has("code")));
    this._activatedRoute.queryParams.pipe(filter( params => params.code)).subscribe(params => this.code = params.code);

    this.createForm();
  };
  
  createForm() {
    this._registerForm = this._form.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    },
    {validator: this.checkPasswords }
    );
  }

  onSubmit() {
    this._AuthService.completeRegister(this.code, this._registerForm.value).subscribe(data => {
      this._router.navigate(['/login']);
    });
  }

  checkPasswords(_registerForm: FormGroup){
    let pass = _registerForm.controls.password.value;
    let confirmPass = _registerForm.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true}
  }

}
