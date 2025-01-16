import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NgxGaugeModule } from 'ngx-gauge';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, BreadcrumbComponent, BienvenueComponent, StatistiquesComponent],
      providers: [
                    provideHttpClient(), // Fournit HttpClient
                    ControllerDataService,
                    ServeurService
                  ],
      imports: [FontAwesomeModule, NgxGaugeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
