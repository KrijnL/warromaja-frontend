import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Artist } from '../model/artist';

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

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsUrl)
      .pipe(
        tap(_ => this.log('fetched artists')),
        catchError(this.handleError<Artist[]>('getArtists',  []))
      );
  }

  getArtist(id: number): Observable<Artist>{
    const url = `${this.artistsUrl}/${id}`;
    return this.http.get<Artist>(url)
      .pipe(
        tap(_ => this.log(`fetched artist with id=${id}`)),
        catchError(this.handleError<Artist>(`getArtist id=${id}`))
      )
  }

  searchArtists(term: string): Observable<Artist[]>{
    if(!term.trim()) {
      //if no search term, return an empty erray
      return of([]);
    }
    return this.http.get<Artist[]>(`${this.artistsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Artist[]>('searchArtists', []))
      )
  }

  addArtist(artist: Artist): Observable<Artist>{
    return this.http.post<Artist>(this.artistsUrl, artist, httpOptions).pipe(
      tap((newArtist: Artist) => this.log(`Added new artist ${newArtist.name}, id ${newArtist.id}`)),
      catchError(this.handleError<Artist>('AddArtist'))
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
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: Send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error
      this.log(`${operation} failed: ${error.message}`);

      //Let the app keep running and return an empty result
      return of(result as T);

    }
  }
}
