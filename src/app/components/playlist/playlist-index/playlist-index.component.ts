import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { UserAudioData } from 'src/app/models/UserAudioData';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-playlist-index',
  templateUrl: './playlist-index.component.html',
  styleUrls: ['./playlist-index.component.css']
})
export class PlaylistIndexComponent implements OnInit {

  constructor(private _playlistService: PlaylistService, _breakpointObserver: BreakpointObserver) { 
    _breakpointObserver.observe([
      Breakpoints.Tablet
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  playlistIndex: Playlist[];
  userAudioData: UserAudioData;
  userData: number[] = [];
  username: string;
  public isMobile: boolean = false;

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.userData
      , label: 'Your Average Audio Data' },
    { data: [0,0,0,0,0,0,0], label: 'Selected Playlist Data' }
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

  updateSecondDataset(playlist: Playlist) {
    const chartData: number[] = this.userData;
    this.chartDatasets = [
      { data: chartData },
      { data: [playlist.Danceability, playlist.Energy, playlist.Speechiness, playlist.Acousticness, playlist.Instrumentalness, playlist.Liveness, playlist.Valence]}
    ]
  }


  ngOnInit() {
    this._playlistService.getPlaylists().subscribe((res: Playlist[]) => this.playlistIndex = res);

    this._playlistService.getUserAudioData().subscribe((res: UserAudioData) => { 
      this.userData.push(res.Danceability, res.Energy, res.Speechiness, res.Acousticness, res.Instrumentalness, res.Liveness, res.Valence);
    });

    setTimeout(() => {
      this.updateDataset()
    }, 1500);
  }
}
