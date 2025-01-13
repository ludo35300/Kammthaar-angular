import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BatterieParametresComponent } from '../batterie-parametres.component';
import { BatterieService } from '../../../services/batterie/batterie.service';

describe('BatterieParametresComponent', () => {
  let component: BatterieParametresComponent;
  let fixture: ComponentFixture<BatterieParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieParametresComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatterieService,           // Fournit PsService
            ],
      imports:[FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
