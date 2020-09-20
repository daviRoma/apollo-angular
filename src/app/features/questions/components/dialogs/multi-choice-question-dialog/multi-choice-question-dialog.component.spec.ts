import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceQuestionDialogComponent } from './multi-choice-question-dialog.component';

describe('MultiChoiceQuestionDialogComponent', () => {
  let component: MultiChoiceQuestionDialogComponent;
  let fixture: ComponentFixture<MultiChoiceQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChoiceQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
