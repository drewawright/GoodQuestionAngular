import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/services/app-auth.service';

@Component({
  selector: 'app-analyze-user',
  templateUrl: './analyze-user.component.html',
  styleUrls: ['./analyze-user.component.css']
})

export class AnalyzeUserComponent implements OnInit {

  playlistArray: Playlist[];
  constructor(private _songService: SongService, private _playlistService: PlaylistService, private _router: Router,private _appAuth: AppAuthService) { }

  ngOnInit() {
    this._appAuth.refreshUserToken().subscribe(res => 
      this._playlistService.getPlaylistsSpotify().subscribe(res => 
        this._songService.getAllUserSongs().subscribe(res => this._songService.refreshAllUserSongsArtwork().subscribe(
          res => this._router.navigate(['playlist'])))));
  }
}
