import { Component } from '@angular/core';

import { Artist } from '../../model/artist';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent {

  model = new Artist(11, 'Goangaroo', 'https://via.placeholder.com/300', 'Boundin', 'https://soundlcoud.com/goa-kangaroo');

  submitted = false;


  onSubmit(form) {
    this.submitted = true;
    console.log(form.value);
  }

  newArtist() {
    this.model = new Artist(12, '','')
  }

  // TODO: remove this after we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor(private artistService: ArtistService){

  }

  createArtist(artist): void {
    artist.name = artist.name.trim();
    if(!name){return}

  }


}
