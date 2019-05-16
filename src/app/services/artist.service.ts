import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../model/artist';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artistsUrl = 'http://localhost:3000/artists';



  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  getArtists(): Observable<Product[]> {
    return this.http.get<Product[]>(this.artistsUrl)
      .pipe(
        tap(_ => this.log('fetched artists')),
        catchError(this.handleError<Product[]>('getArtists',  []))
      );
  }

  getArtist(id: number): Observable<Product> {
    const url = `${this.artistsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`fetched artist with id=${id}`)),
        catchError(this.handleError<Product>(`getArtist id=${id}`))
      );
  }

  searchArtists(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if no search term, return an empty erray
      return of([]);
    }
    return this.http.get<Product[]>(`${this.artistsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Product[]>('searchArtists', []))
      );
  }

  addArtist(artist: Product): Observable<Product> {
    return this.http.post<Product>(this.artistsUrl, artist, httpOptions).pipe(
      tap((newArtist: Product) => this.log(`Added new artist ${newArtist.name}, id ${newArtist.id}`)),
      catchError(this.handleError<Product>('AddArtist'))
    );
  }



  private log(message: string) {
    this.messageService.add(`ArtistService: ${message}`);
  }


  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running and return an empty result
      return of(result as T);

    };
  }
}
