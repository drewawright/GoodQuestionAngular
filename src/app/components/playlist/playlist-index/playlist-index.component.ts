import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { UserAudioData } from 'src/app/models/UserAudioData';

@Component({
  selector: 'app-playlist-index',
  templateUrl: './playlist-index.component.html',
  styleUrls: ['./playlist-index.component.css']
})
export class PlaylistIndexComponent implements OnInit {

  constructor(private _playlistService: PlaylistService) { }

  playlistIndex: Playlist[];
  userAudioData: UserAudioData;

  ngOnInit() {
    this._playlistService.getPlaylists().subscribe((res: Playlist[]) => this.playlistIndex = res);
    this._playlistService.getUserAudioData().subscribe((res: UserAudioData) => this.userAudioData = res);
  }
}
