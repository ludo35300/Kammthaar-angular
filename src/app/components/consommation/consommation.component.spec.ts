import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommationComponent } from './consommation.component';
import { provideHttpClient } from '@angular/common/http';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerGraphiqueComponent } from '../controller/controller-graphique/controller-graphique.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';

describe('ConsommationComponent', () => {
  let component: ConsommationComponent;
  let fixture: ComponentFixture<ConsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsommationComponent,
              ControllerGraphiqueComponent,
              BreadcrumbComponent,],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        ServeurService,           // Fournit PsService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
