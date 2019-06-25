import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoProdottoPage } from './nuovo-prodotto.page';

describe('Nuovo Prodotto', () => {
  let component: NuovoProdottoPage;
  let fixture: ComponentFixture<NuovoProdottoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NuovoProdottoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoProdottoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
