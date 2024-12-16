import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDataComponent } from './ps-data.component';

describe('PsDataComponent', () => {
  let component: PsDataComponent;
  let fixture: ComponentFixture<PsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
