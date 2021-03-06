import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/artist';
import { ArtistService } from '../../services/artist.service';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: Product[];



  constructor(private artistService: ArtistService) {

  }

  ngOnInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.artistService.getArtists()
    .subscribe(artists => this.artists = artists);
  }



}
