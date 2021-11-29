import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private log(message: string) {
    this.messageService.add(message);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap((_heroes) => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', [])),
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap((_hero) => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>('getHero')),
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      // TODO send error to remote logging
      console.error(error);

      // TODO better transform the error to be understandable by the user
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
