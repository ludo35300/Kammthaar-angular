import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieParametresComponent } from './batterie-parametres.component';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('BatterieParametresComponent', () => {
  let component: BatterieParametresComponent;
  let fixture: ComponentFixture<BatterieParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieParametresComponent],
      providers: [
              provideHttpClient(), // Fournit HttpClient
              BatterieRealtimeService,           // Fournit PsService
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
