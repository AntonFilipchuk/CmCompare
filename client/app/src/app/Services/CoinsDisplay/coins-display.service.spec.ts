import { TestBed } from '@angular/core/testing';

import { CoinsDisplayService } from './coins-display.service';

describe('CoinsDisplayService', () => {
  let service: CoinsDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
