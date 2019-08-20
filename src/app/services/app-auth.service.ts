import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenRequest } from 'src/app/models/TokenRequest';
import { RegisterSpotifyUser } from '../models/RegisterSpotifyUser';
import { APIURL } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  userInfo: Token;
  isLoggedIn = new Subject<boolean>();
  isRegistered = new Subject<boolean>();
  
  constructor(private _http: HttpClient, private _router: Router) { }
  
  externalLoginUrl: string;

  register(regUserData: RegisterUser){
    return this._http.post(`${APIURL}/api/account/register`, regUserData);
  }

  login(loginInfo) {
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.username)}&password=${encodeURI(loginInfo.password)}`;

      return this._http.post(`${APIURL}/Token`, str).subscribe( (token:Token) => {
        this.userInfo = token;
        localStorage.setItem('id_token', token.access_token);
        this.isLoggedIn.next(true);
        this._router.navigate(['analyze-user']);
      });
  }

  adminLogin(loginInfo) {
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.username)}&password=${encodeURI(loginInfo.password)}`;

      return this._http.post(`${APIURL}/Token`, str).subscribe( (token:Token) => {
        this.userInfo = token;
        localStorage.setItem('id_token', token.access_token);
        this.isLoggedIn.next(true);
        this._router.navigate(['admin/portal']);
      });
  }

  getExternalUrl() {
      return this._http.get(`${APIURL}/api/Account/ExternalLogins?returnUrl=%2F&generateState=true`).subscribe(response => this.externalLoginUrl = response[0].Url);
  }

  authExternal() {
    const authHeader = this.getHeaders();
    authHeader.append('Access-Control-Allow-Origin', '*');

    return this._http.get(`${APIURL}${this.externalLoginUrl}`, {headers: authHeader});
  }

  completeRegister(codes: string, registerData: RegisterSpotifyUser){
    const str = `?code=${codes}&password=${registerData.password}`
    return this._http.post(`${APIURL}/api/Account/CompleteRegister${str}`, {headers: this.getHeaders()});
  }

  currentUser(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${APIURL}/api/Account/UserInfo`, {headers: this.getHeaders()});
  }

  refreshUserToken(){
    console.log(`https://localhost:44347/api/Account/RefreshToken`);
    return this._http.get(`${APIURL}/api/Account/RefreshToken`, {headers: this.getHeaders()});
  }

  logout(){
    localStorage.clear();
    this.isLoggedIn.next(false);
    this._http.get(`${APIURL}/api/Account/Logout`, {headers: this.getHeaders()}).subscribe();
    this._router.navigate(['/login']);
  }

  getUserAudioData(){
    return this._http.get(`${APIURL}/api/account/UserAudioData`, {headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
