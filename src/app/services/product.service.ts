import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Product} from '../model/product';
import {catchError} from 'rxjs/internal/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = 'localhost:3000/products';


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts',  []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`fetched product with id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if no search term, return an empty erray
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap((newProduct: Product) => this.log(`Added new prooduct ${newProduct.name}, id ${newProduct.id}`)),
      catchError(this.handleError<Product>('AddProduct'))
    );
  }



  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
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
