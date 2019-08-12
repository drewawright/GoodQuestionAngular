import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const ApiUrl = 'http://musicqeary.azurewebistes.net/api';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private _http: HttpClient) { }

  getPlaylists() {
    return this._http.get(`${ApiUrl}/Playlist/Index`, { headers: this.getHeaders() });
  }

  getPlaylistById(id: string) {
    return this._http.get(`${ApiUrl}/Playlist/Detail/${id}`)
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
