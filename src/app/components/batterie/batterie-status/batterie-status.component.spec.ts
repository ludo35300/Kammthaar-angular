import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatterieStatusComponent } from './batterie-status.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { of } from 'rxjs';

describe('BatterieStatusComponent', () => {
  let component: BatterieStatusComponent;
  let fixture: ComponentFixture<BatterieStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatterieStatusComponent ],
      providers: [
        provideHttpClient(), // Fournit HttpClient
        ServeurService,           // Fournit PsService
        {
          provide: ActivatedRoute, // Fournit un mock d'ActivatedRoute
          useValue: {
            params: of({ id: '123' }), // Simule les paramètres de l'URL
            queryParams: of({}), // Simule les queryParams si utilisés
            snapshot: {
              paramMap: {
                get: (key: string) => '123', // Simule snapshot.paramMap.get('clé')
              },
            },
          },
        },
      ],
      imports: [FontAwesomeModule, NgbTooltipModule, RouterLinkWithHref,
        RouterLinkActive,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatterieStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
