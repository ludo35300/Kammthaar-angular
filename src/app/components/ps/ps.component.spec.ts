import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComponent } from './ps.component';
import { provideHttpClient } from '@angular/common/http';
import { PsService } from '../../services/ps/ps.service';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { PsDataComponent } from './ps-data/ps-data.component';
import { PsGraphiqueComponent } from './ps-graphique/ps-graphique.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('PsRealtimeComponent', () => {
  let component: PsComponent;
  let fixture: ComponentFixture<PsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsComponent, BreadcrumbComponent, PsDataComponent, PsGraphiqueComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              PsService,           // Fournit PsService
            ],
      imports: [FontAwesomeModule, NgbTooltipModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
