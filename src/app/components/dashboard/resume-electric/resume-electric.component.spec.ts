import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeElectricComponent } from './resume-electric.component';

describe('ResumeElectricComponent', () => {
  let component: ResumeElectricComponent;
  let fixture: ComponentFixture<ResumeElectricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeElectricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeElectricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
