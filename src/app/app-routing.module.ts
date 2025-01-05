import { LOCALE_ID, NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PsComponent } from './components/ps/ps.component';
import { ControllerComponent } from './components/controller/controller.component';
import { BatterieComponent } from './components/batterie/batterie.component';
import { BatterieParametresComponent } from './components/batterie-parametres/batterie-parametres.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ps', component: PsComponent },
  { path: 'controller', component: ControllerComponent },
  { path: 'batterie/details', component: BatterieComponent},
  { path: 'batterie/parametres', component: BatterieParametresComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
})
export class AppRoutingModule { }
