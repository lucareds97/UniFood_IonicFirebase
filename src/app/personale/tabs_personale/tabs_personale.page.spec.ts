import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPagePersonale } from './tabs_personale.page';

describe('TabsPage', () => {
  let component: TabsPagePersonale;
  let fixture: ComponentFixture<TabsPagePersonale>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPagePersonale],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPagePersonale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
