import { LOCALE_ID, NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PsComponent } from './components/ps/ps.component';
import { ControllerComponent } from './components/controller/controller.component';
import { BatterieComponent } from './components/batterie/batterie.component';
import { BatterieParametresComponent } from './components/batterie-parametres/batterie-parametres.component';
import { ConsommationComponent } from './components/consommation/consommation.component';
import { LoginComponent } from './components/login/login.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'ps', component: PsComponent , canActivate: [AuthGuard]},
  { path: 'controller', component: ControllerComponent , canActivate: [AuthGuard]},
  { path: 'consommation', component: ConsommationComponent , canActivate: [AuthGuard]},
  { path: 'batterie/details', component: BatterieComponent, canActivate: [AuthGuard]},
  { path: 'batterie/parametres', component: BatterieParametresComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'apropos', component: AproposComponent},

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
