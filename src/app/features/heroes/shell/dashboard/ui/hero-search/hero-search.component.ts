import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroesStore } from '../../../../data/hero.store';

@Component({
  selector: 'toh-hero-search',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnDestroy {

  #heroesStore = inject(HeroesStore);
  heroes = this.#heroesStore.searchedHeroes;

  ngOnDestroy(): void {
      this.#heroesStore.searchHero('');
  }

  search(term: string): void {
    this.#heroesStore.searchHero(term);
  }
}
