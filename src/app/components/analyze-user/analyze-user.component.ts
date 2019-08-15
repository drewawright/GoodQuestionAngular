import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-analyze-user',
  templateUrl: './analyze-user.component.html',
  styles: []
})
export class AnalyzeUserComponent implements OnInit {

  constructor(private _songService: SongService, private _playlistService: PlaylistService) { }

  ngOnInit() {
    this._playlistService.getPlaylistsSpotify();
  }

}
