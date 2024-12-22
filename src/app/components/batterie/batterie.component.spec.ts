import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieComponent } from './batterie.component';
import { provideHttpClient } from '@angular/common/http';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { BatterieDataComponent } from './batterie-data/batterie-data.component';
import { BatterieGraphiqueComponent } from './batterie-graphique/batterie-graphique.component';
import { BatteriePourcentageComponent } from './batterie-pourcentage/batterie-pourcentage.component';
import { BatterieTemperatureComponent } from './batterie-temperature/batterie-temperature.component';
import { BatterieStatusComponent } from './batterie-status/batterie-status.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('BatterieRealtimeComponent', () => {
  let component: BatterieComponent;
  let fixture: ComponentFixture<BatterieComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BatterieComponent, 
        BreadcrumbComponent, 
        BatterieDataComponent, 
        BatterieGraphiqueComponent, 
        BatteriePourcentageComponent,
        BatterieTemperatureComponent,
        BatterieStatusComponent
      ],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              ServeurService,           // Fournit PsService
      ],
      imports: [FontAwesomeModule, NgbTooltipModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
