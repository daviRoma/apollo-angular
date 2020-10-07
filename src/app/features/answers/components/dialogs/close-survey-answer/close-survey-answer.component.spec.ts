import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSurveyAnswerComponent } from './close-survey-answer.component';

describe('CloseSurveyAnswerComponent', () => {
  let component: CloseSurveyAnswerComponent;
  let fixture: ComponentFixture<CloseSurveyAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSurveyAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSurveyAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
