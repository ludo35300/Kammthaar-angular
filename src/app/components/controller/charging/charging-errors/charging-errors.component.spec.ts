import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingErrorsComponent } from './charging-errors.component';

describe('ChargingErrorsComponent', () => {
  let component: ChargingErrorsComponent;
  let fixture: ComponentFixture<ChargingErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargingErrorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
