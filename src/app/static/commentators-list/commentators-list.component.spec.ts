import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentatorsListComponent } from './commentators-list.component';

describe('CommentatorsListComponent', () => {
  let component: CommentatorsListComponent;
  let fixture: ComponentFixture<CommentatorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentatorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
