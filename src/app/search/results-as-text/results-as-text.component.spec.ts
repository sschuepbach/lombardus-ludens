import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAsTextComponent } from './results-as-text.component';

describe('ResultsAsTextComponent', () => {
  let component: ResultsAsTextComponent;
  let fixture: ComponentFixture<ResultsAsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsAsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsAsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
