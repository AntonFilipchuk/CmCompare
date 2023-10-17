import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsTableRowComponent } from './coins-table-row.component';

describe('CoinsTableRowComponent', () => {
  let component: CoinsTableRowComponent;
  let fixture: ComponentFixture<CoinsTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinsTableRowComponent]
    });
    fixture = TestBed.createComponent(CoinsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
