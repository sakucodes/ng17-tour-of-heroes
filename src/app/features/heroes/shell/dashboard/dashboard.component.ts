import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from './ui/hero-search/hero-search.component';
import { HeroesStore } from '../../data/hero.store';

@Component({
  selector: 'toh-dashboard',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  readonly #heroesStore = inject(HeroesStore);

  topHeroes = this.#heroesStore.topHeroes;
}
