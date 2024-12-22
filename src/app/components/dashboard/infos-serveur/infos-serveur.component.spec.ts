import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfosServeurComponent } from './infos-serveur.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('InfosServeurComponent', () => {
  let component: InfosServeurComponent;
  let fixture: ComponentFixture<InfosServeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfosServeurComponent],
      imports: [FontAwesomeModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
