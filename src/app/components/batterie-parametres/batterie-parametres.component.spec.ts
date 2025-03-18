import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BatterieParametresComponent } from './batterie-parametres.component';
import { ParametresComponent } from './batterie/parametres.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BatterieRealtimeComponent', () => {
  let component: BatterieParametresComponent;
  let fixture: ComponentFixture<BatterieParametresComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BatterieParametresComponent, 
        ParametresComponent,
        BreadcrumbComponent, 
      ],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              ServeurService,           // Fournit PsService
      ],
      imports: [FontAwesomeModule, NgbTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
