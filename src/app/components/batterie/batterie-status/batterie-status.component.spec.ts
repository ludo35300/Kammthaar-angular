import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieStatusComponent } from './batterie-status.component';
import { provideHttpClient } from '@angular/common/http';
import { BatterieStatusService } from '../../../services/batterie-status/batterie-status.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('BatterieStatusComponent', () => {
  let component: BatterieStatusComponent;
  let fixture: ComponentFixture<BatterieStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieStatusComponent],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        BatterieStatusService,           // Fournit PsService
      ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  


});
