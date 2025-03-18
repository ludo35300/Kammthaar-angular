import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsGraphiqueComponent } from './ps-graphique.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SolarDataService } from '../../../services/solarData/solar-data.service';

describe('PsGraphiqueComponent', () => {
  let component: PsGraphiqueComponent;
  let fixture: ComponentFixture<PsGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsGraphiqueComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              SolarDataService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
