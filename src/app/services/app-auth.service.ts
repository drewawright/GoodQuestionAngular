import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenRequest } from 'src/app/models/TokenRequest';

const AppApi_Url = 'https://musicqeary.azurewebsites.net';


@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  userInfo: Token;
  isLoggedIn = new Subject<boolean>();
  
  constructor(private _http: HttpClient, private _router: Router) { }
  
  externalLoginUrl: string;

  register(regUserData: RegisterUser){
    return this._http.post(`${AppApi_Url}/api/account/register`, regUserData);
  }

  login(loginInfo) {
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.username)}&password=${encodeURI(loginInfo.password)}`;

      return this._http.post(`${AppApi_Url}/Token`, str).subscribe( (token:Token) => {
        this.userInfo = token;
        localStorage.setItem('id_token', token.access_token);
        this.isLoggedIn.next(true);
        this._router.navigate(['/']);
      });
  }

  getExternalUrl() {
      return this._http.get(`${AppApi_Url}/api/Account/ExternalLogins?returnUrl=%2F&generateState=true`).subscribe(response => this.externalLoginUrl = response[0].Url);
  }

  authExternal() {
    const authHeader = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    authHeader.append('Access-Control-Allow-Origin', '*');

    return this._http.get(`${AppApi_Url}${this.externalLoginUrl}`, {headers: authHeader});
  }

  getToken(codes: string){
    const request: TokenRequest ={
      code: codes,
      grant_type: "authorization_code",
      redirect_uri: "http%3A%2F%2Flocalhost%3A4200%2Fcomplete-registration"
    };
    let body = `grant_type=${request.grant_type}&code=${request.code}&redirect_uri=${request.redirect_uri}`;
    const getTokenHeader = new HttpHeaders().set('Authorization', 'Basic ZTljMzlkNWZmNTEwNDcwOGI4NDRiZTk4ZTFlZjEwOGM6NWJjMWRjNTZmZGMwNGE3ZDk4Njg2MTUxMWYwYWJkYWY=')
    console.log(request.code);
    this._http.post('https://accounts.spotify.com/api/token', body, {headers: getTokenHeader}).subscribe();
    
  }

  currentUser(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    const authHeader = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);

    return this._http.get(`${AppApi_Url}/api/Account/UserInfo`, {headers: authHeader});
  }

  logout(){
    localStorage.clear();
    this.isLoggedIn.next(false);

    const authHeader = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    this._http.post(`${AppApi_Url}/api/Account/Logout`, {headers: authHeader}).subscribe();
    this._router.navigate(['/login']);
    console.log('hmmm');
  }
}
