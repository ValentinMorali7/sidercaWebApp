import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchstandardtubesComponent } from './searchstandardtubes.component';

describe('SearchstandardtubesComponent', () => {
  let component: SearchstandardtubesComponent;
  let fixture: ComponentFixture<SearchstandardtubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchstandardtubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchstandardtubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
