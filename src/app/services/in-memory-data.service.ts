import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../model/artist';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const artists = [
      { id: 1, name: 'Goangaroo' , thumbnail:'https://via.placeholder.com/50'},
      { id: 2, name: 'Flagellum' , thumbnail:'https://via.placeholder.com/50'},
      {id:3, name: 'Ferratek' , thumbnail:'https://via.placeholder.com/50'},
      {id:4, name:'AEIO', thumbnail:'https://via.placeholder.com/50'}
    ];
    return {artists};
  }

  genId(artists: Product[]): number {
    return artists.length > 0 ? Math.max(...artists.map(artist =>  artist.id)) + 1 : 1;
  }

  constructor() { }
}
