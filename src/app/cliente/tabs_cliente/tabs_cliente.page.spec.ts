import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPageCliente } from './tabs_cliente.page';

describe('TabsPage', () => {
  let component: TabsPageCliente;
  let fixture: ComponentFixture<TabsPageCliente>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPageCliente],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPageCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
