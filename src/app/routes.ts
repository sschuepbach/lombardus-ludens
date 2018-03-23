import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found';

export const routes: Routes = [
  {path: '', redirectTo: '/commentators', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]
