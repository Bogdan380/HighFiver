import { TestBed } from '@angular/core/testing';

import { SpecificAwardService } from './specific-award.service';

describe('SpecificAwardService', () => {
  let service: SpecificAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
