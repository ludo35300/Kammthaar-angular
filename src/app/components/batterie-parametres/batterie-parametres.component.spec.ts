import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieParametresComponent } from './batterie-parametres.component';

describe('BatterieParametresComponent', () => {
  let component: BatterieParametresComponent;
  let fixture: ComponentFixture<BatterieParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieParametresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
