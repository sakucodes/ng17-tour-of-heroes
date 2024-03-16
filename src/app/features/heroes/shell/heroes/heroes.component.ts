import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroFormComponent } from '../../ui/hero-form/hero-form.component';
import { HeroesStore } from '../../data/hero.store';

@Component({
  selector: 'toh-heroes',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, HeroFormComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {

  #heroesStore = inject(HeroesStore);

  heroes = this.#heroesStore.heroes;

  async deleteHero(id: number): Promise<void> {
    await this.#heroesStore.deleteHero(id);
  }

}
