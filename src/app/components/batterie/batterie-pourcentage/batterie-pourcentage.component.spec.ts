import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteriePourcentageComponent } from './batterie-pourcentage.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BatteryStatusService } from '../../../services/batteryStatus/battery-status.service';

describe('BatteriePourcentageComponent', () => {
  let component: BatteriePourcentageComponent;
  let fixture: ComponentFixture<BatteriePourcentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatteriePourcentageComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatteryStatusService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteriePourcentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
