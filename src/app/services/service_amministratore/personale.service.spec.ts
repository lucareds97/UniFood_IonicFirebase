import { TestBed } from '@angular/core/testing';

import { PersonaleService } from './personale.service';

describe('PersonaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaleService = TestBed.get(PersonaleService);
    expect(service).toBeTruthy();
  });
});
