import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationMatrixComponent } from './aggregation-matrix';

describe('AggregationMatrixComponent', () => {
  let component: AggregationMatrixComponent;
  let fixture: ComponentFixture<AggregationMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
