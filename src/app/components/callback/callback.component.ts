import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TokenRequest } from 'src/app/models/TokenRequest';
import { AppAuthService } from 'src/app/services/app-auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  code:string;
  private request:TokenRequest;
  constructor(private _activatedRoute: ActivatedRoute, private _AuthService: AppAuthService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(routeData => console.log(routeData.has("code")));
    this._activatedRoute.queryParams.pipe(filter( params => params.code)).subscribe(params => this.code = params.code);

    // this.request.code = this.code;
    // this.request.grant_type = "authorization_code";
    // this.request.redirect_uri = "http%3A%2F%2Flocalhost%3A4200%2Fcomplete-registration";
    
    console.log(this.code);
    
    this._AuthService.getToken(this.code);
    
  }

}
