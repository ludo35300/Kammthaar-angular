import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenueComponent } from './bienvenue.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';
import { EnergyStatisticsService } from '../../../services/energyStatistics/energy-statistics.service';

describe('BienvenueComponent', () => {
  let component: BienvenueComponent;
  let fixture: ComponentFixture<BienvenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenueComponent],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        EnergyStatisticsService, 
      ],
      imports: [FontAwesomeModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
