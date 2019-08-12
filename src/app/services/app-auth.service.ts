import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient } from '@angular/common/http';

const AppApi_Url = 'https://musicqeary.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  constructor(private _http: HttpClient) { }

  register(regUserData: RegisterUser){
    return this._http.post(`${AppApi_Url}/api/account/register`, regUserData);
  }
}
