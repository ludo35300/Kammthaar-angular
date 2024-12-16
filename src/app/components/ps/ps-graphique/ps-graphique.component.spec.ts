import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsGraphiqueComponent } from './ps-graphique.component';

describe('PsGraphiqueComponent', () => {
  let component: PsGraphiqueComponent;
  let fixture: ComponentFixture<PsGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsGraphiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
