import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { AsyncPipe, Location, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../data/hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroFormComponent } from '../../ui/hero-form/hero-form.component';

const imports = [
  AsyncPipe,
  UpperCasePipe,
  FormsModule,
  NgIf,
  HeroFormComponent
]

@Component({
  selector: 'toh-hero-detail',
  standalone: true,
  imports: imports,
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {

  hero?: Hero;

  #heroService: HeroService = inject(HeroService);

  #route: ActivatedRoute = inject(ActivatedRoute);
  #location: Location = inject(Location);

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero(): void {
    const id = Number(this.#route.snapshot.paramMap.get('id'));

    this.#heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  heroUpdated(): void {
    this.goBack()
  }

  save(): void {
    if (this.hero) {
      this.#heroService.updateHero(this.hero)
        .subscribe(() =>
          this.goBack()
        );
    }
  }

  goBack(): void {
    this.#location.back();
  }
}
