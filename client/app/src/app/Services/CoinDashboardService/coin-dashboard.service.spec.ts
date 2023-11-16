import { TestBed } from '@angular/core/testing';

import { CoinDashboardService } from './coin-dashboard.service';

describe('CoinDashboardService', () => {
  let service: CoinDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
