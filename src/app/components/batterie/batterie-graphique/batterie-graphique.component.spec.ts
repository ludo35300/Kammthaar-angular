import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieGraphiqueComponent } from './batterie-graphique.component';

describe('BatterieGraphiqueComponent', () => {
  let component: BatterieGraphiqueComponent;
  let fixture: ComponentFixture<BatterieGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieGraphiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
