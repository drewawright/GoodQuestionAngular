import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { APIURL } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private _http: HttpClient,) { }

  getSongs(id: string) {
    return this._http.get(`${APIURL}/api/Song/Index/${id}`, { headers: this.getHeaders() })
  }

  getSongById(id: string) {
    return this._http.get(`${APIURL}/api/Song/Detail/${id}`, { headers: this.getHeaders() });
  }

  getSongsInPlaylist(id: string){
    return this._http.get(`${APIURL}/api/Song/${id}`, {headers: this.getHeaders()});
  }

  getAllUserSongs(){
    return this._http.get(`${APIURL}/api/Song/UserSongs`, {headers: this.getHeaders()});
  }
  refreshAllUserSongsArtwork(){
    return this._http.get(`${APIURL}/api/Song/RefreshUserSongsArtwork`, {headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
