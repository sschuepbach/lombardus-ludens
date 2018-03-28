import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationFacetComponent } from './affiliation-facet';

describe('AffiliationFacetComponent', () => {
  let component: AffiliationFacetComponent;
  let fixture: ComponentFixture<AffiliationFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliationFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliationFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
