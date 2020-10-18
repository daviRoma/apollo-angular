import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBaseErrorComponent } from './layout-base-error.component';

describe('LayoutBaseErrorComponent', () => {
  let component: LayoutBaseErrorComponent;
  let fixture: ComponentFixture<LayoutBaseErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBaseErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBaseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
