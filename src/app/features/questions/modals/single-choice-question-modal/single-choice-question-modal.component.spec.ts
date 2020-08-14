import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionModalComponent } from './single-choice-question-modal.component';

describe('SingleChoiceQuestionModalComponent', () => {
  let component: SingleChoiceQuestionModalComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChoiceQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
