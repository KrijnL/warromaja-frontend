import { Component, OnInit } from '@angular/core';
import { Artist } from '../../model/artist';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.css']
})
export class ArtistDashboardComponent implements OnInit {

  artists: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.artistService.getArtists()
      .subscribe(artists => this.artists = artists.slice(0,5))
  }
}
