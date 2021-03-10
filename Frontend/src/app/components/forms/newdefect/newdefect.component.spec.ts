import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdefectComponent } from './newdefect.component';

describe('NewdefectComponent', () => {
  let component: NewdefectComponent;
  let fixture: ComponentFixture<NewdefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
