import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDataComponent } from './ps-data.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SolarDataService } from '../../../services/solarData/solar-data.service';

describe('PsDataComponent', () => {
  let component: PsDataComponent;
  let fixture: ComponentFixture<PsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsDataComponent],
      imports: [FontAwesomeModule, NgbTooltipModule],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        SolarDataService,           // Fournit PsService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
