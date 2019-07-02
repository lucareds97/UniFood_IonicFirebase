import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdinePage } from './modal-ordine.page';

describe('ModalOrdinePage', () => {
  let component: ModalOrdinePage;
  let fixture: ComponentFixture<ModalOrdinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrdinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
