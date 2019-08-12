import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist-index',
  templateUrl: './playlist-index.component.html',
  styleUrls: ['./playlist-index.component.css']
})
export class PlaylistIndexComponent implements OnInit {

  constructor(private _playlistService: PlaylistService) { }

  playlistIndex: Playlist[];

  ngOnInit() {
    this._playlistService.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlistIndex = playlists
    })
  }

}
