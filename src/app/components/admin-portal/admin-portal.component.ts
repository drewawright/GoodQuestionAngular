import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { APIURL } from '../../../environments/environment.prod';
import { AppAuthService } from 'src/app/services/app-auth.service';
import { AppUserAuth } from 'src/app/models/AppUserAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  
  constructor(private _http: HttpClient, private _appAuthService: AppAuthService, private _router: Router) { }

  role: string;

  ngOnInit() {
    this._appAuthService.getUserInfo().subscribe((res: AppUserAuth) => {
      this.role = res.Role; 
      if (this.role != "Admin") {this._router.navigate(['/home'])}
    });
  }

  runBigWipe() {
    var authHeader = this.getHeaders();
    authHeader.append('Access-Control-Allow-Origin', '*');
    this._http.post(`${APIURL}/Account/BigWipe`, { headers: authHeader }).subscribe();
  }

  runBiggestWipe() {
    this._http.post(`${APIURL}/Account/BiggestWipe`, { headers: this.getHeaders() }).subscribe();
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
