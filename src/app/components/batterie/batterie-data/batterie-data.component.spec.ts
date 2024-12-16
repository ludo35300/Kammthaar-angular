import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieDataComponent } from './batterie-data.component';

describe('BatterieDataComponent', () => {
  let component: BatterieDataComponent;
  let fixture: ComponentFixture<BatterieDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieDataComponent]
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
