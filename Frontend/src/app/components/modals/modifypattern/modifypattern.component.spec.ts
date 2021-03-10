import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifypatternComponent } from './modifypattern.component';

describe('ModifypatternComponent', () => {
  let component: ModifypatternComponent;
  let fixture: ComponentFixture<ModifypatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifypatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifypatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
