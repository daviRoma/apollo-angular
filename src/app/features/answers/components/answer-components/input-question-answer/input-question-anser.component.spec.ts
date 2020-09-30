import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuestionAnswerComponent } from './input-question-answer.component';

describe('InputQuestionAnswerComponent', () => {
  let component: InputQuestionAnswerComponent;
  let fixture: ComponentFixture<InputQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
