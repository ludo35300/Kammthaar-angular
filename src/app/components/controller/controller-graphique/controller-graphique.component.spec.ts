import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerGraphiqueComponent } from './controller-graphique.component';

describe('ControllerGraphiqueComponent', () => {
  let component: ControllerGraphiqueComponent;
  let fixture: ComponentFixture<ControllerGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerGraphiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
