import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoOrdiniPage } from './storico-ordini.page';

describe('StoricoOrdiniPage', () => {
  let component: StoricoOrdiniPage;
  let fixture: ComponentFixture<StoricoOrdiniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoricoOrdiniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoOrdiniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
