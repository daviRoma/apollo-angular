import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionAnswerComponent } from './choice-question-answer.component';

describe('ChoiceQuestionAnswerComponent', () => {
  let component: ChoiceQuestionAnswerComponent;
  let fixture: ComponentFixture<ChoiceQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
