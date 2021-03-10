import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatternComponent } from './viewpattern.component';

describe('ViewpatternComponent', () => {
  let component: ViewpatternComponent;
  let fixture: ComponentFixture<ViewpatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
