import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaProdottoPage } from './visualizza-prodotto.page';

describe('VisualizzaProdottoPage', () => {
  let component: VisualizzaProdottoPage;
  let fixture: ComponentFixture<VisualizzaProdottoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizzaProdottoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaProdottoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
