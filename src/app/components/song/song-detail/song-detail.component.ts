import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  song: Song;

  userData: number[] = [];

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.userData
      , label: 'Song Audio Data' },
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


  constructor(private _activatedRoute: ActivatedRoute, private _songService: SongService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongById(routeData.get('id')).subscribe((pulledSong: Song) => {
        this.song = pulledSong;
      });
    });
    
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongById(routeData.get('id')).subscribe((songResult: Song) => {
        this.userData.push(songResult.Danceability, songResult.Energy, songResult.Speechiness, songResult.Acousticness, songResult.Instrumentalness, songResult.Liveness, songResult.Valence);
      });
    });

    setTimeout(() => {
      this.updateDataset()
    }, 1000);
  }

}