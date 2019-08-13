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

  public chartType: string = "radar";

  public chartDataSets: Array<any> = [
    { data: [0.514, 0.735, 0.578, 0.0902, 0.159, 0.0461, 0.624], label: "Measure for Measure" }
  ];

  public chartLabels: Array<any> = [ 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  song: Song;

  constructor(private _songService: SongService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => {
      this._songService.getSongById(routeData.get('songId')).subscribe((singleSong: Song) => {
        this.song = singleSong;
      });
    });
  }

}
