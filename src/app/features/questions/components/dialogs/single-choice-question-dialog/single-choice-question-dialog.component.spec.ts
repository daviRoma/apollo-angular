import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionDialogComponent } from './single-choice-question-dialog.component';

describe('SingleChoiceQuestionDialogComponent', () => {
  let component: SingleChoiceQuestionDialogComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChoiceQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
