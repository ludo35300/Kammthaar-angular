import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieGraphiqueComponent } from './batterie-graphique.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BatteryStatusService } from '../../../services/batteryStatus/battery-status.service';

describe('BatterieGraphiqueComponent', () => {
  let component: BatterieGraphiqueComponent;
  let fixture: ComponentFixture<BatterieGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieGraphiqueComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatteryStatusService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
