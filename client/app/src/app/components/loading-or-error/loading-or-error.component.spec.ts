import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOrErrorComponent } from './loading-or-error.component';

describe('LoadingOrErrorComponent', () => {
  let component: LoadingOrErrorComponent;
  let fixture: ComponentFixture<LoadingOrErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOrErrorComponent]
    });
    fixture = TestBed.createComponent(LoadingOrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
