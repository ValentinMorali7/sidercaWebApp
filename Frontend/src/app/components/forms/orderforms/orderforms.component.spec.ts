import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformsComponent } from './orderforms.component';

describe('OrderformsComponent', () => {
  let component: OrderformsComponent;
  let fixture: ComponentFixture<OrderformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
