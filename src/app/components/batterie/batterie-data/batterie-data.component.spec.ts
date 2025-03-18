import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieDataComponent } from './batterie-data.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BatteryStatusService } from '../../../services/batteryStatus/battery-status.service';

describe('BatterieDataComponent', () => {
  let component: BatterieDataComponent;
  let fixture: ComponentFixture<BatterieDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieDataComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatteryStatusService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
