import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProdottoClientePage } from './modal-prodotto-cliente.page';

describe('ModalProdottoClientePage', () => {
  let component: ModalProdottoClientePage;
  let fixture: ComponentFixture<ModalProdottoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProdottoClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProdottoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
