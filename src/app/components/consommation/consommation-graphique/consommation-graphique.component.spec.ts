import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerGraphiqueComponent } from './consommation-graphique.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ControllerDataService } from '../../../services/controllerData/controller-data.service';

describe('ControllerGraphiqueComponent', () => {
  let component: ControllerGraphiqueComponent;
  let fixture: ComponentFixture<ControllerGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerGraphiqueComponent],
      imports: [
        CommonModule,           // Ajoutez CommonModule pour les directives de base comme ngIf, ngFor
        NgApexchartsModule,     // Ajoutez NgApexchartsModule si vous utilisez ng-apexcharts
        FontAwesomeModule,      // Ajoutez FontAwesomeModule si vous utilisez FontAwesome
      ],
      providers: [
        provideHttpClient(),    // Fournir HttpClient pour les requêtes HTTP
        ControllerDataService,      // Fournir le service ControllerService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
