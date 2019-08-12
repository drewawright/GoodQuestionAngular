import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const ApiUrl = 'http://musicqeary.azurewebistes.net/api';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private _http: HttpClient,) { }

  getSongs(id: string) {
    return this._http.get(`${ApiUrl}/Song/Index/${id}`, { headers: this.getHeaders() })
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
