import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieDataComponent } from './batterie-data.component';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('BatterieDataComponent', () => {
  let component: BatterieDataComponent;
  let fixture: ComponentFixture<BatterieDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieDataComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatterieRealtimeService,           // Fournit PsService
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
