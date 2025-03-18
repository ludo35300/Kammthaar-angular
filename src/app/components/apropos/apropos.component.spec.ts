import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposComponent } from './apropos.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { provideHttpClient } from '@angular/common/http';

describe('AproposComponent', () => {
  let component: AproposComponent;
  let fixture: ComponentFixture<AproposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AproposComponent,BreadcrumbComponent,],
      providers: [
              provideHttpClient(), // Fournit HttpClient
            ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
