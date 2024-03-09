import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HeroService } from '../../data/hero.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'toh-heroes',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  
  heroes?: Observable<Hero[]>;
  selectedHero?: Hero;

  #heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroes = this.#heroService.getHeroes();
  }

}
