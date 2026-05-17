/**
 * Application routing configuration for Eventify.
 * @author Estudiante U202319440
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { RatingComponent } from './engagement/pages/rating/rating.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'engagement/ratings/new', component: RatingComponent },
  { path: '**', component: PageNotFoundComponent }
];
