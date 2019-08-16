import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyze-user',
  templateUrl: './analyze-user.component.html',
  styles: []
})

export class AnalyzeUserComponent implements OnInit {

  playlistArray: Playlist[];
  constructor(private _songService: SongService, private _playlistService: PlaylistService, private _router: Router) { }

  ngOnInit() {
    this._playlistService.getPlaylistsSpotify().subscribe(res => console.log(res));
    this.scheduleGetAllUserSongs();

    //this._songService.getAllUserSongs().subscribe(res => console.log(res));
    //this._playlistService.getPlaylists().subscribe((res: Playlist[]) => console.log(res));
    //this._playlistService.getPlaylists().subscribe((res: Playlist[]) => res.forEach( (playlist) => { this._songService.getSongsInPlaylist(playlist.PlaylistId).subscribe(res => console.log(res))}));
    //this.playlistArray.forEach( (playlist) => {this._songService.getSongsInPlaylist(playlist.PlaylistId).subscribe(res => console.log(res))});
  }

  resolveAfterYSeconds(x,y) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, y);
    });
  }

  scheduleGetAllUserSongs() {
    this.resolveAfterYSeconds(20,2000).then(value => {
      this._songService.getAllUserSongs().subscribe(res => console.log(res));
      this.scheduleRoute();
    });
  }

  scheduleRoute() {
    this.resolveAfterYSeconds(20,30000).then(value => {
      this._router.navigate(['playlist']);
    });
  }
}
