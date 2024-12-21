import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieTemperatureComponent } from './batterie-temperature.component';

describe('BatterieTemperatureComponent', () => {
  let component: BatterieTemperatureComponent;
  let fixture: ComponentFixture<BatterieTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieTemperatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
