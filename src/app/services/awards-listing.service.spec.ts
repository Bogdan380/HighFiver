import { TestBed } from "@angular/core/testing";

import { AwardsListingService } from "./awards-listing.service";

describe("AwardsListingService", () => {
  let service: AwardsListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardsListingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
