import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../../../../models/hero';
import { HeroService } from '../../../../data/hero.service';

@Component({
  selector: 'toh-hero-search',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  #searchTerms = new Subject<string>();

  #heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.heroes$ = this.#searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.#heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.#searchTerms.next(term);
  }
}
