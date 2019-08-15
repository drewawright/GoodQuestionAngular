import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatCardModule, MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAuthService } from './services/app-auth.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistIndexComponent } from './components/playlist/playlist-index/playlist-index.component';
import { PlaylistService } from './services/playlist.service';
import { SongIndexComponent } from './components/song/song-index/song-index.component';
import { SongDetailComponent } from './components/song/song-detail/song-detail.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AnalyzeUserComponent } from './components/analyze-user/analyze-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    PlaylistIndexComponent,
    SongIndexComponent,
    SongDetailComponent,
    CallbackComponent,
    AnalyzeUserComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressBarModule
],
providers: [
    AppAuthService,
    PlaylistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
