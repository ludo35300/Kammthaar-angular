import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieParametresComponent } from './batterie-parametres.component';
import { ServeurService } from '../../services/serveur/serveur.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatterieParametresComponent', () => {
  let component: BatterieParametresComponent;
  let fixture: ComponentFixture<BatterieParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatterieParametresComponent],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        ServeurService,           // Fournit PsService
      ],
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
