import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
//import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'artists', component:ArtistsComponent},
  { path: 'home', component:HomeComponent},
  { path: 'artist/:id', component: ArtistDetailComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
