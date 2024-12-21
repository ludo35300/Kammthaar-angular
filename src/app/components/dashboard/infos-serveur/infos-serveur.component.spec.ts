import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosServeurComponent } from './infos-serveur.component';

describe('InfosServeurComponent', () => {
  let component: InfosServeurComponent;
  let fixture: ComponentFixture<InfosServeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfosServeurComponent]
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
