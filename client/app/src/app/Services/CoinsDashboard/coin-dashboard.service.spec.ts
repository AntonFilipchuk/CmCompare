import { TestBed } from '@angular/core/testing';

import { CoinsDashboardService } from './coin-dashboard.service';

describe('CoinDashboardService', () => {
  let service: CoinsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
