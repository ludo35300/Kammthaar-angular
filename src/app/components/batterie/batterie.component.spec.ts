import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieComponent } from './batterie.component';

describe('BatterieRealtimeComponent', () => {
  let component: BatterieComponent;
  let fixture: ComponentFixture<BatterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
