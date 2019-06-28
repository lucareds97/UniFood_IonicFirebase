import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoPersonalePage } from './nuovo-personale.page';

describe('NuovoPersonalePage', () => {
  let component: NuovoPersonalePage;
  let fixture: ComponentFixture<NuovoPersonalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovoPersonalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoPersonalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
