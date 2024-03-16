import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
export class HeroSearchComponent {

  #heroesStore = inject(HeroesStore);
  heroes = this.#heroesStore.searchedHeroes;

  search(term: string): void {
    this.#heroesStore.searchHero(term);
  }
}
