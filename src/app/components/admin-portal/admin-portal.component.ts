import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { APIURL } from '../../../environments/environment.prod';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  ngOnInit() {
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
