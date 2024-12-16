import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerRealtimeComponent } from './controller.component';

describe('ControllerRealtimeComponent', () => {
  let component: ControllerRealtimeComponent;
  let fixture: ComponentFixture<ControllerRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerRealtimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
