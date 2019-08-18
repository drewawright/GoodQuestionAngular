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
  userData: number[] = [];
  username: string;

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.userData
      , label: 'Your Average Audio Data' },
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
    legend: {
      labels: {
        fontColor: '#fbfbfb'
      }
    },
    scale:{
      ticks: {
        display: false
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
      { data: chartData }
    ]
  }


  ngOnInit() {
    this._playlistService.getPlaylists().subscribe((res: Playlist[]) => this.playlistIndex = res);

    this._playlistService.getUserAudioData().subscribe((res: UserAudioData) => { 
      this.userData.push(res.Danceability, res.Energy, res.Speechiness, res.Acousticness, res.Instrumentalness, res.Liveness, res.Valence);
    });

    setTimeout(() => {
      this.updateDataset()
    }, 1000);
  }
}
