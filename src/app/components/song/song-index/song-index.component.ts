import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from '../../../models/song';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-song-index',
  templateUrl: './song-index.component.html',
  styleUrls: ['./song-index.component.css']
})
export class SongIndexComponent implements OnInit {

  songIndex: Song[];

  playlist: Playlist;

  constructor(private _activatedRoute: ActivatedRoute, private _songService: SongService, private _playlistService: PlaylistService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongs(routeData.get('id')).subscribe((songs: Song[]) => {
        this.songIndex = songs;
      });
    });
    
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._playlistService.getPlaylistById(routeData.get('id')).subscribe((playlistResult: Playlist) => {
        this.playlist = playlistResult;
        console.log(this.playlist);
      });
    });
  }

}
