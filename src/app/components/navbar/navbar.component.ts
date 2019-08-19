import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AppAuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
