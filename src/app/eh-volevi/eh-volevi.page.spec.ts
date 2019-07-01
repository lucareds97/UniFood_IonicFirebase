import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhVoleviPage } from './eh-volevi.page';

describe('EhVoleviPage', () => {
  let component: EhVoleviPage;
  let fixture: ComponentFixture<EhVoleviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhVoleviPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhVoleviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
