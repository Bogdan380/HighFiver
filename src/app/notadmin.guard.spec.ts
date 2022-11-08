import { TestBed } from '@angular/core/testing';

import { NotadminGuard } from './notadmin.guard';

describe('NotadminGuard', () => {
  let guard: NotadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
