import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargingErrorsComponent } from './discharging-errors.component';

describe('DischargingErrorsComponent', () => {
  let component: DischargingErrorsComponent;
  let fixture: ComponentFixture<DischargingErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DischargingErrorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargingErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
