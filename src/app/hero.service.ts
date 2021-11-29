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
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private log(message: string) {
    this.messageService.add(message);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero')),
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero')),
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_heroes) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])),
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_hero) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero')),
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((foundHeroes) => foundHeroes.length
        ? this.log(`found heroes matching ${term}`)
        : this.log(`no heroes found matching term ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
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
