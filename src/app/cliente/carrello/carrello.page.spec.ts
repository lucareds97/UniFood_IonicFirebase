import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrelloPage } from './carrello.page';

describe('CarrelloPage', () => {
  let component: CarrelloPage;
  let fixture: ComponentFixture<CarrelloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrelloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrelloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
