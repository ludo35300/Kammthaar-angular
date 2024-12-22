import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerGraphiqueComponent } from './controller-graphique.component';
import { ControllerService } from '../../../services/controller/controller.service';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';

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
        ControllerService,      // Fournir le service ControllerService
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
