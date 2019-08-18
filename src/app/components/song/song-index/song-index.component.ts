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

  userData: number[] = [];

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.userData
      , label: 'Average Playlist Audio Data' },
  ];

  public chartLabels: Array<any> = ['Danceabiltiy', 'Energy', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(143, 87, 225, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
    scale:{
      ticks: {
        display: false
      }
    }
  };

  updateDataset() {
    const chartData: number[] = this.userData;
    this.chartDatasets = [
      { data: chartData }
    ]
  }


  constructor(private _activatedRoute: ActivatedRoute, private _songService: SongService, private _playlistService: PlaylistService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongs(routeData.get('id')).subscribe((songs: Song[]) => {
        this.songIndex = songs;
      });
    });
    
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._playlistService.getPlaylistById(routeData.get('id')).subscribe((playlistResult: Playlist) => {
        this.userData.push(playlistResult.Danceability, playlistResult.Energy, playlistResult.Speechiness, playlistResult.Acousticness, playlistResult.Instrumentalness, playlistResult.Liveness, playlistResult.Valence);
      });
    });

    setTimeout(() => {
      this.updateDataset()
    }, 1000);
  }

}
