import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupAnswerDetailComponent } from './question-group-answer-detail.component';

describe('QuestionGroupAnswerDetailComponent', () => {
  let component: QuestionGroupAnswerDetailComponent;
  let fixture: ComponentFixture<QuestionGroupAnswerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupAnswerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupAnswerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
