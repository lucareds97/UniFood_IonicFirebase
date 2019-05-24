import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaProdottoPage } from './modifica-prodotto.page';

describe('ModificaProdottoPage', () => {
  let component: ModificaProdottoPage;
  let fixture: ComponentFixture<ModificaProdottoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaProdottoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaProdottoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
