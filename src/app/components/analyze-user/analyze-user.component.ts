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
    this._playlistService.getPlaylistsSpotify().subscribe(res => this._songService.getAllUserSongs().subscribe(res => this._router.navigate(['playlist'])));
  }
}
