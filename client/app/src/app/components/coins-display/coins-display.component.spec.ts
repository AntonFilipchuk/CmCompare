import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsDisplayComponent } from './coins-display.component';

describe('CoinsDisplayComponent', () => {
  let component: CoinsDisplayComponent;
  let fixture: ComponentFixture<CoinsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinsDisplayComponent]
    });
    fixture = TestBed.createComponent(CoinsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
