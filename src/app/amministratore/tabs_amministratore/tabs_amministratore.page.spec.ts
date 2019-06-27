import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPageAmministratore } from './tabs_amministratore.page';

describe('TabsPage', () => {
  let component: TabsPageAmministratore;
  let fixture: ComponentFixture<TabsPageAmministratore>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPageAmministratore],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPageAmministratore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
