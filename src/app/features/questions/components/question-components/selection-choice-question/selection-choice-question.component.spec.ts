import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionChoiceQuestionComponent } from './selection-choice-question.component';

describe('SelectionChoiceQuestionComponent', () => {
  let component: SelectionChoiceQuestionComponent;
  let fixture: ComponentFixture<SelectionChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionChoiceQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
