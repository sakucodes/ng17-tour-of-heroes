import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, Location, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroFormComponent } from '../../ui/hero-form/hero-form.component';
import { HeroesStore } from '../../data/hero.store';

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
  styleUrl: './hero-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {

  #heroesStore = inject(HeroesStore);
  #route: ActivatedRoute = inject(ActivatedRoute);
  #location: Location = inject(Location);

  hero = this.#heroesStore.selectedHero;

  ngOnInit(): void {
    const id = Number(this.#route.snapshot.paramMap.get('id'));
    this.#heroesStore.loadHero(id);
  }

  goBack(): void {
    this.#location.back();
  }
}
