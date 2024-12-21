import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieStatusComponent } from './batterie-status.component';

describe('BatterieStatusComponent', () => {
  let component: BatterieStatusComponent;
  let fixture: ComponentFixture<BatterieStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieStatusComponent]
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
