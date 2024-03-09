import { Component, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { AsyncPipe, Location, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../data/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'toh-hero-detail',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, FormsModule, NgIf],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {
  
  hero$?: Observable<Hero>;

  #heroService: HeroService = inject(HeroService);

  #route: ActivatedRoute = inject(ActivatedRoute);
  #location: Location = inject(Location);

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero(): void {
    const id = Number(this.#route.snapshot.paramMap.get('id'));

    this.hero$ = this.#heroService.getHero(id);
  }

  goBack(): void {
    this.#location.back();
  }
}
