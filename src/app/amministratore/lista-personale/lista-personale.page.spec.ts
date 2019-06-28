import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonalePage } from './lista-personale.page';

describe('ListaPersonalePage', () => {
  let component: ListaPersonalePage;
  let fixture: ComponentFixture<ListaPersonalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPersonalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPersonalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
