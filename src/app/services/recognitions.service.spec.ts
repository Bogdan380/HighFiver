import { TestBed } from "@angular/core/testing";

import { RecognitionsService } from "./recognitions.service";

describe("RecognitionsService", () => {
  let service: RecognitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognitionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
