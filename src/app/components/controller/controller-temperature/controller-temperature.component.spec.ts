import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerTemperatureComponent } from './controller-temperature.component';
import { ControllerService } from '../../../services/controller/controller.service';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('ControllerTemperatureComponent', () => {
  let component: ControllerTemperatureComponent;
  let fixture: ComponentFixture<ControllerTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerTemperatureComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              ControllerService,           // Fournit PsService
            ],
            imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
