import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixQuestionAnswerComponent } from './matrix-question-answer.component';

describe('MatrixQuestionAnswerComponent', () => {
  let component: MatrixQuestionAnswerComponent;
  let fixture: ComponentFixture<MatrixQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
