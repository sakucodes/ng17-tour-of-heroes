import { Injectable, inject } from '@angular/core';
import { Hero } from '../models/hero';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from '../../messages/data/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  #messageService: MessageService = inject(MessageService);
  #httpClient: HttpClient = inject(HttpClient);

  #heroesUrl = 'api/heroes';  // URL to web api

  #httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** with of() */
  // getHeroes(): Observable<Hero[]> {
  //   this.log('HeroService: fetching heroes');
  //   const heroes = of(HEROES).pipe(
  //     delay(500),
  //     tap(_ => this.log('HeroService: fetched heroes'),
  //     ));
  //   return heroes;
  // }

  /** with of() */
  // getHero(id: number): Observable<Hero> {
  //   const hero = HEROES.find(h => h.id === id);
  //   if (hero == null) {
  //     this.log(`HeroService: failed to fetch hero id=${id}`);
  //     return of({} as Hero);
  //   }

  //   this.log(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  /** GET heroes */
  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetching heroes');

    return this.#httpClient.get<Hero[]>(this.#heroesUrl)
      .pipe(
        tap(() => this.log('HeroService: fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;

    return this.#httpClient.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.#httpClient.get<Hero[]>(`${this.#heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<unknown> {
    return this.#httpClient.put(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<unknown>('updateHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;

    return this.#httpClient.delete<Hero>(url, this.#httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error ?? error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.#messageService.add(message);
  }
}
