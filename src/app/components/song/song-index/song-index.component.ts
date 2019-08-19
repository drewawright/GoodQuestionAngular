import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from '../../../models/song';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-song-index',
  templateUrl: './song-index.component.html',
  styleUrls: ['./song-index.component.css']
})
export class SongIndexComponent implements OnInit {

  public isMobile: boolean = false;
  songIndex: Song[];

  playlist: Playlist;
  playlistUrl: string;

  userData: number[] = [];

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.userData
      , label: 'Average Playlist Audio Data' },
    { data: [0,0,0,0,0,0,0], label: 'Selected Song Data' }
  ];

  public chartLabels: Array<any> = ['Danceabiltiy', 'Energy', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(143, 87, 225, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(25, 118, 210, .2)',
      borderColor: 'rgba(25, 118, 210, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#fbfbfb'
      }
    },
    scale:{
      ticks: {
        display: false,
        max: 1
      },
      pointLabels: {
        fontColor: '#fbfbfb',
        fontSize: 16
      },
      gridLines: {
        color: '#374140'
      },
      angleLines: {
        color: '#374140'
      }
    }
  };

  updateDataset() {
    const chartData: number[] = this.userData;
    this.chartDatasets = [
      { data: chartData },
      { data: [0,0,0,0,0,0,0]}
    ]
  }

  updateSecondDataset(song: Song) {
    const chartData: number[] = this.userData;
    this.chartDatasets = [
      { data: chartData },
      { data: [song.Danceability, song.Energy, song.Speechiness, song.Acousticness, song.Instrumentalness, song.Liveness, song.Valence]}
    ]
  }


  constructor(private _activatedRoute: ActivatedRoute, private _songService: SongService, private _playlistService: PlaylistService, _breakpointObserver: BreakpointObserver) { 
    _breakpointObserver.observe([
      Breakpoints.Tablet
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongs(routeData.get('id')).subscribe((songs: Song[]) => {
        this.songIndex = songs;
      });
    });
    
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._playlistService.getPlaylistById(routeData.get('id')).subscribe((playlistResult: Playlist) => {
        this.userData.push(playlistResult.Danceability, playlistResult.Energy, playlistResult.Speechiness, playlistResult.Acousticness, playlistResult.Instrumentalness, playlistResult.Liveness, playlistResult.Valence),
        this.playlistUrl = `https://open.spotify.com/embed/playlist/${playlistResult.PlaylistId}`, this.playlist = playlistResult;
      });
    });

    setTimeout(() => {
      this.updateDataset()
    }, 1500);
  }

}
