import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { APIURL } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private _http: HttpClient) { }

  getPlaylists() {
    return this._http.get(`${APIURL}/api/Playlist/Index`, { headers: this.getHeaders() });
  }

  getPlaylistsSpotify(){
    return this._http.get(`${APIURL}/api/Playlist/Spotify`, { headers: this.getHeaders() });
  }

  getPlaylistById(id: string) {
    return this._http.get(`${APIURL}/api/Playlist/Detail/${id}`, { headers: this.getHeaders() })
  }

  getUserAudioData() {
    return this._http.get(`${APIURL}/api/Account/UserAudioData`, { headers: this.getHeaders() })
  }


  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
