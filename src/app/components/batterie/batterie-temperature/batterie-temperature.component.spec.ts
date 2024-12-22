import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieTemperatureComponent } from './batterie-temperature.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BatterieStatusService } from '../../../services/batterie-status/batterie-status.service';

describe('BatterieTemperatureComponent', () => {
  let component: BatterieTemperatureComponent;
  let fixture: ComponentFixture<BatterieTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieTemperatureComponent],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        BatterieStatusService,           // Fournit PsService
      ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
