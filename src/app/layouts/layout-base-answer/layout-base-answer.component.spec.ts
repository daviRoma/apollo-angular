import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBaseAnswerComponent } from './layout-base-answer.component';

describe('LayoutBaseAnswerComponent', () => {
  let component: LayoutBaseAnswerComponent;
  let fixture: ComponentFixture<LayoutBaseAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBaseAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBaseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
