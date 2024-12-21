import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteriePourcentageComponent } from './batterie-pourcentage.component';

describe('BatteriePourcentageComponent', () => {
  let component: BatteriePourcentageComponent;
  let fixture: ComponentFixture<BatteriePourcentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatteriePourcentageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteriePourcentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
