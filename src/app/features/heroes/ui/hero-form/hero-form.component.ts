import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { FormsModule } from '@angular/forms';
import { POWERS } from '../../data/mock-heroes';
import { NgFor } from '@angular/common';
import { HeroService } from '../../data/hero.service';

@Component({
  selector: 'toh-hero-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnChanges {

  @Input() hero?: Hero;

  @Output() added: EventEmitter<Hero> = new EventEmitter<Hero>();
  @Output() updated: EventEmitter<Hero> = new EventEmitter<Hero>();

  model: Hero = {
    id: 0,
    name: '',
    power: '',
    alterEgo: ''
  };

  powers = POWERS;
  submitted = false;

  #heroService: HeroService = inject(HeroService);

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['hero'];
    if(change.isFirstChange()) {
      this.model = change.currentValue as Hero;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.model.id <= 0) {
      this.#heroService.addHero({ name: this.model.name, power: this.model.power, alterEgo: this.model.alterEgo } as Hero)
        .subscribe(hero => {
          this.added.emit(hero);
          this.newHero();
        });
    } else {
      this.#heroService.updateHero(this.model)
        .subscribe(() => {
          this.updated.emit(this.model);
          this.newHero();
        });
    }
  }

  newHero() {
    this.model = {} as Hero;
    this.submitted = false;
  }
}
