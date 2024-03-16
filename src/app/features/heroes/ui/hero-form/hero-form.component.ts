import { ChangeDetectionStrategy, Component, OnDestroy, effect, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroesStore } from '../../data/hero.store';

@Component({
  selector: 'toh-hero-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroFormComponent implements OnDestroy {

  #heroesStore = inject(HeroesStore);

  readonly #initialHeroModel: Hero = {
    id: 0,
    name: '',
    power: '',
    alterEgo: ''
  };

  model: Hero = this.#initialHeroModel;

  powers = this.#heroesStore.powers();

  constructor() {
    effect(() => {
      const hero = this.#heroesStore.selectedHero();
      if (hero !== null) {
        this.model = hero;
      }
    });
  }

  ngOnDestroy(): void {
      this.#heroesStore.loadHero(0);
  }

  onSubmit(form: NgForm) {
    if (this.model.id <= 0) {
      const hero = { name: this.model.name.trim(), power: this.model.power, alterEgo: this.model.alterEgo } as Hero;
      this.#heroesStore.addHero(hero);
      this.newHero(form);
    } else {
      this.#heroesStore.updateHero(this.model);
    }
  }

  newHero(form: NgForm) {
    this.model = this.#initialHeroModel;
    form.reset();
  }
}
