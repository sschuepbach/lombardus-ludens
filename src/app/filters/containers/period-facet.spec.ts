import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFacetComponent } from './period-facet';

describe('PeriodFacetComponent', () => {
  let component: PeriodFacetComponent;
  let fixture: ComponentFixture<PeriodFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
