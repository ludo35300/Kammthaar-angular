import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargingComponent } from './discharging.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('DischargingComponent', () => {
  let component: DischargingComponent;
  let fixture: ComponentFixture<DischargingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DischargingComponent],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
