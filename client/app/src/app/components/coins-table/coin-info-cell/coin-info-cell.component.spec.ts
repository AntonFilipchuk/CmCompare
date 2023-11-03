import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinInfoCellComponent } from './coin-info-cell.component';

describe('CoinInfoCellComponent', () => {
  let component: CoinInfoCellComponent;
  let fixture: ComponentFixture<CoinInfoCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinInfoCellComponent]
    });
    fixture = TestBed.createComponent(CoinInfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
