import { Injectable, inject } from '@angular/core';
import { Hero } from '../models/hero';
import { HEROES } from './mock-heroes';
import { Observable, delay, of, tap } from 'rxjs';
import { MessageService } from '../../messages/data/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  #messageService: MessageService = inject(MessageService);

  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetching heroes');
    const heroes = of(HEROES).pipe(
      delay(500),
      tap(_ => this.log('HeroService: fetched heroes'),
      ));
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id);
    if (hero == null) {
      this.log(`HeroService: failed to fetch hero id=${id}`);
      return of({} as Hero);
    }

    this.log(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  private log(message: string): void {
    this.#messageService.add(message);
  }
}
