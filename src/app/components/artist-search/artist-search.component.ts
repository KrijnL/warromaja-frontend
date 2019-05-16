import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Product } from '../../model/artist';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {
  artists$: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(private artistService: ArtistService) { }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.artists$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before searching
      debounceTime(300),
      //Only serach if different from last term
      distinctUntilChanged(),
      //switch to new search observable every time term changes
      switchMap((term:string)=> this.artistService.searchArtists(term)),
    )
  }


}
