import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesComponent } from './statistiques.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxGauge, NgxGaugeModule } from 'ngx-gauge';
import { EnergyStatisticsService } from '../../../services/energyStatistics/energy-statistics.service';

describe('StatistiquesComponent', () => {
  let component: StatistiquesComponent;
  let fixture: ComponentFixture<StatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatistiquesComponent],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        EnergyStatisticsService,
      ],
      imports: [NgxGaugeModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
