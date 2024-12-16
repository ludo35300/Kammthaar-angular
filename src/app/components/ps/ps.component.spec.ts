import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsRealtimeComponent } from './ps.component';

describe('PsRealtimeComponent', () => {
  let component: PsRealtimeComponent;
  let fixture: ComponentFixture<PsRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsRealtimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
