import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchorderbytypeComponent } from './searchorderbytype.component';

describe('SearchorderbytypeComponent', () => {
  let component: SearchorderbytypeComponent;
  let fixture: ComponentFixture<SearchorderbytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchorderbytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchorderbytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
