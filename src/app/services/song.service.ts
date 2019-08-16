import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const ApiUrl = 'https://musicqeary.azurewebsites.net/api';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private _http: HttpClient,) { }

  getSongs(id: string) {
    return this._http.get(`${ApiUrl}/Song/Index/${id}`, { headers: this.getHeaders() })
  }

  getSongById(id: string) {
    return this._http.get(`${ApiUrl}/Song/Detail/${id}`, { headers: this.getHeaders() });
  }

  getSongsInPlaylist(id: string){
    return this._http.get(`${ApiUrl}/Song/${id}`, {headers: this.getHeaders()});
  }

  getAllUserSongs(){
    return this._http.get(`${ApiUrl}/Song/UserSongs`, {headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
