import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupAnswerBoxComponent } from './question-group-answer-box.component';

describe('QuestionGroupAnswerBoxComponent', () => {
  let component: QuestionGroupAnswerBoxComponent;
  let fixture: ComponentFixture<QuestionGroupAnswerBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupAnswerBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupAnswerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
