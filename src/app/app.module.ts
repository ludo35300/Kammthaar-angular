import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { PsComponent } from './components/ps/ps.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './layout/header/header.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ControllerComponent } from './components/controller/controller.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BatterieComponent } from './components/batterie/batterie.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BatterieParametresComponent } from './components/batterie/batterie-parametres/batterie-parametres.component';
import { BatterieDataComponent } from './components/batterie/batterie-data/batterie-data.component';
import { ControllerDataComponent } from './components/controller/controller-data/controller-data.component';
import { PsDataComponent } from './components/ps/ps-data/ps-data.component';
import { NgOptimizedImage } from '@angular/common';
import { ControllerGraphiqueComponent } from './components/controller/controller-graphique/controller-graphique.component';
import { PsGraphiqueComponent } from './components/ps/ps-graphique/ps-graphique.component';
import { BatterieGraphiqueComponent } from './components/batterie/batterie-graphique/batterie-graphique.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StatistiquesComponent } from './components/dashboard/statistiques/statistiques.component';
import { BienvenueComponent } from './components/dashboard/bienvenue/bienvenue.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { InfosServeurComponent } from './components/dashboard/infos-serveur/infos-serveur.component';
import { BatteriePourcentageComponent } from './components/batterie/batterie-pourcentage/batterie-pourcentage.component';
import { BatterieStatusComponent } from './components/batterie/batterie-status/batterie-status.component';
import { BatterieTemperatureComponent } from './components/batterie/batterie-temperature/batterie-temperature.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PsComponent,
    DashboardComponent,
    ControllerComponent,
    BatterieComponent,
    BatterieParametresComponent,
    BatterieDataComponent,
    ControllerDataComponent,
    PsDataComponent,
    ControllerGraphiqueComponent,
    PsGraphiqueComponent,
    BatterieGraphiqueComponent,
    StatistiquesComponent,
    BienvenueComponent,
    BreadcrumbComponent,
    InfosServeurComponent,
    BatteriePourcentageComponent,
    BatterieStatusComponent,
    BatterieTemperatureComponent
  ],
  imports: [
    NgOptimizedImage,
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule,
    FontAwesomeModule,
    NgApexchartsModule,
    NgbTooltipModule,
    
  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
