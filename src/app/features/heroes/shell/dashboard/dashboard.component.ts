import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../data/hero.service';
import { Observable, map } from 'rxjs';
import { Hero } from '../../models/hero';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'toh-dashboard',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  heroes?: Observable<Hero[]>;

  #heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroes = this.#heroService.getHeroes().pipe(
      map((h) => h.slice(1, 5))
    );
  }
}
