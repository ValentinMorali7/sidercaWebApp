import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectdeailtsComponent } from './defectdeailts.component';

describe('DefectdeailtsComponent', () => {
  let component: DefectdeailtsComponent;
  let fixture: ComponentFixture<DefectdeailtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectdeailtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectdeailtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
