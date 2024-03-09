import { Routes } from '@angular/router';
import { HeroesComponent } from './features/heroes/shell/heroes/heroes.component';
import { DashboardComponent } from './features/heroes/shell/dashboard/dashboard.component';
import { HeroDetailComponent } from './features/heroes/shell/hero-detail/hero-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
];
