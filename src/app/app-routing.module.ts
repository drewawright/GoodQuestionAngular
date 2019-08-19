import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistIndexComponent } from './components/playlist/playlist-index/playlist-index.component';
import { SongIndexComponent } from './components/song/song-index/song-index.component';
import { SongDetailComponent } from './components/song/song-detail/song-detail.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AnalyzeUserComponent } from './components/analyze-user/analyze-user.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';


const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'playlist', children: [
      { path: '', component: PlaylistIndexComponent},
    ]
  },
  {
    path: 'song', children: [
      { path: ':id', component: SongIndexComponent },
      { path: 'detail/:id', component: SongDetailComponent },
    ]
  },
  { path: 'callback', component: CallbackComponent },
  { path: 'analyze-user', component: AnalyzeUserComponent },
  {
    path: 'admin', children: [
      { path: 'login', component: AdminLoginComponent },
      { path: 'portal', component: AdminPortalComponent },
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
