import { Component, OnInit } from '@angular/core';
import { Artist } from '../../model/artist';
import { ArtistService } from '../../services/artist.service';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: Artist[];
  
  

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
