import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HeroService } from '../../data/hero.service';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HeroFormComponent } from '../../ui/hero-form/hero-form.component';

@Component({
  selector: 'toh-heroes',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, HeroFormComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  #heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.loadHeroes();
  }

  async loadHeroes(): Promise<void> {
    this.heroes = await firstValueFrom(this.#heroService.getHeroes());
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.#heroService.addHero({ name } as Hero)
  //     .subscribe(hero =>
  //       this.heroes.push(hero)
  //     );
  // }

  heroAdded(hero: Hero): void {
    this.heroes.push(hero);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.#heroService.deleteHero(hero.id).subscribe();
  }

}
