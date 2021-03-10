import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultofstandardtubesComponent } from './searchresultofstandardtubes.component';

describe('SearchresultofstandardtubesComponent', () => {
  let component: SearchresultofstandardtubesComponent;
  let fixture: ComponentFixture<SearchresultofstandardtubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresultofstandardtubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultofstandardtubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
