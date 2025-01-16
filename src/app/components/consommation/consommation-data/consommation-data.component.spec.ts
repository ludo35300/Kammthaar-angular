import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerDataComponent } from './consommation-data.component';
import { ControllerService } from '../../../services/controller/controller.service';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('ControllerDataComponent', () => {
  let component: ControllerDataComponent;
  let fixture: ComponentFixture<ControllerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerDataComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              ControllerService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
