import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniPage } from './ordini.page';

describe('OrdiniPage', () => {
  let component: OrdiniPage;
  let fixture: ComponentFixture<OrdiniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdiniPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
