import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerComponent } from './controller.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { ControllerGraphiqueComponent } from '../consommation/consommation-graphique/consommation-graphique.component';
import { ControllerTemperatureComponent } from './controller-temperature/controller-temperature.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';

describe('ControllerRealtimeComponent', () => {
  let component: ControllerComponent;
  let fixture: ComponentFixture<ControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ControllerComponent,
        ControllerGraphiqueComponent,
        ControllerTemperatureComponent,
        BreadcrumbComponent,

      ],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              ControllerDataService,
              ServeurService
            ],
      imports:[ FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
