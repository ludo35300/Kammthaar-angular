import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingComponent } from './charging.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('ChargingComponent', () => {
  let component: ChargingComponent;
  let fixture: ComponentFixture<ChargingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargingComponent],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
